using eListamAPI.Constants;
using eListamAPI.Data;
using eListamAPI.DTOs.Auth;
using eListamAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace eListamAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController : Controller
    {
        #region Fields
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _db;
        private readonly string _secretKey;
        #endregion

        #region Constructor
        public AuthController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext db,
            IConfiguration configuration)

        {
            _userManager = userManager;
            _roleManager = roleManager;
            _db = db;
            _secretKey = configuration.GetValue<string>("Jwt:SecretKey") ?? "";
        }
        #endregion

        #region Users
        [HttpGet("users")]
        public async Task<IActionResult> Users()
        {
            ApiResponse apiResponse = new ApiResponse();
            var existingApplicationUsers = _db.ApplicationUsers.ToList();

            if (existingApplicationUsers != null)
            {
                apiResponse.Data = existingApplicationUsers;
                apiResponse.StatusCode = HttpStatusCode.OK;
                apiResponse.IsSuccess = true;
                return Ok(apiResponse);
            }
        
            apiResponse.StatusCode = HttpStatusCode.BadRequest;
            apiResponse.IsSuccess = false;
            apiResponse.Messages = ["No Users Found."];
            return BadRequest(apiResponse);
        }
        #endregion

        #region Register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            ApiResponse apiResponse = new ApiResponse();
            // Create new Application User if the RegisterDTO model is valid
            if (!ModelState.IsValid)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                foreach (var value in ModelState.Values)
                {
                    foreach (var error in value.Errors)
                    {
                        apiResponse.Messages = [error.ErrorMessage];
                    }
                }

                return BadRequest(apiResponse);
            }

            
            ApplicationUser newApplicationUser = new ApplicationUser()
            {
                UserName = request.UserName,
                Email = request.Email,
                NormalizedUserName = request.UserName.ToUpper(),
                NormalizedEmail = request.Email.ToUpper()
            };

            var result = await _userManager.CreateAsync(newApplicationUser, request.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    apiResponse.Messages = [error.Description];
                }
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                return BadRequest(apiResponse);
            }
            
            // Create roles if not exist
            if (!await _roleManager.RoleExistsAsync(Role.Admin))
            {
                await _roleManager.CreateAsync(new IdentityRole(Role.Admin));
                await _roleManager.CreateAsync(new IdentityRole(Role.User));
            }

            // Assign the given role
            if (request.Role.Equals(Role.Admin, StringComparison.CurrentCultureIgnoreCase))
            {
                await _userManager.AddToRoleAsync(newApplicationUser, Role.Admin);
            }
            else
            {
                await _userManager.AddToRoleAsync(newApplicationUser, Role.User);
            }

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            return Ok(apiResponse);
        }
        #endregion

        #region Login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            ApiResponse apiResponse = new ApiResponse();
            // Check if model is valid
            if (ModelState.IsValid)
            {
                // Find user by email
                var userFromDb = await _userManager.FindByEmailAsync(request.Email);

                if (userFromDb != null)
                {
                    // Check if password is valid
                    bool isPasswordValid = await _userManager.CheckPasswordAsync(userFromDb, request.Password);
                    if (!isPasswordValid)
                    {
                        apiResponse.Data = new object();
                        apiResponse.StatusCode = HttpStatusCode.BadRequest;
                        apiResponse.Messages = ["Invalid credentials"];
                        return BadRequest(apiResponse);
                    }


                    JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                    byte[] key = Encoding.UTF8.GetBytes(_secretKey);

                    // Define JWT
                    SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
                    {
                        Subject = new ClaimsIdentity(
                        [
                            new ("Id", userFromDb.Id),
                            new (ClaimTypes.Email, userFromDb.Email!),
                            new (ClaimTypes.Role, _userManager.GetRolesAsync(userFromDb).Result.FirstOrDefault()!)
                        ]),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                    };

                    // Create JWT
                    SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);

                    // Serialize the security token to string
                    var token = jwtSecurityTokenHandler.WriteToken(securityToken);

                    LoginResponse loginResponseDTO = new LoginResponse()
                    {
                        Token = token,
                    };

                    apiResponse.StatusCode = HttpStatusCode.OK;
                    apiResponse.Data = loginResponseDTO;
                    apiResponse.IsSuccess = true;
                    return Ok(apiResponse);
                }

                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.Messages = ["User doesn't exist!"];
                apiResponse.IsSuccess = false;
                return BadRequest(apiResponse);
            }

            apiResponse.StatusCode = HttpStatusCode.BadRequest;
            apiResponse.IsSuccess = false;
            foreach (var value in ModelState.Values)
            {
                foreach (var error in value.Errors)
                {
                    apiResponse.Messages = [error.ErrorMessage];
                }

            }
            return BadRequest(apiResponse);
        }
        #endregion
    }
}
