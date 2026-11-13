using eListam.Application.Common;
using eListam.Application.DTOs.Auth;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Domain.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace eListam.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {

        #region Fields
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuthRepository _authRepository;
        private readonly string _secretKey;
        #endregion

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAuthRepository authRepository,
            IConfiguration config,
            IHttpContextAccessor httpContextAccessor)
        {
            _authRepository = authRepository;
            _signInManager = signInManager;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _secretKey = config.GetValue<string>("Jwt:SecretKey") ?? string.Empty;
        }

        public Result<string> GetUserId()
        {
            var result = new Result<string>();
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            return 
                !string.IsNullOrEmpty(userId)
                ? result.Success(data: userId)
                : result.Failure(
                    message: "User Id Not Found!",
                    failureType: FailureType.NotFound);
        }
        public Result<string> GetUserEmail()
        {
            var result = new Result<string>();
            var userEmail = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
           
            return
                !string.IsNullOrEmpty(userEmail)
                ? result.Success(data: userEmail)
                : result.Failure(
                    message: "User Email Not Found!",
                    failureType: FailureType.NotFound);
        }
        public Result<string> GetUserName()
        {
            var result = new Result<string>();
            var userName = _httpContextAccessor.HttpContext?.User.Identity?.Name;

            return
                !string.IsNullOrEmpty(userName)
                ? result.Success(data: userName)
                : result.Failure(
                    message: "Username Not Found!",
                    failureType: FailureType.NotFound);
        }

        #region GetApplicationUsersAsync
        public async Task<Result<IEnumerable<ApplicationUser>>> GetAsync()
        {
            var result = new Result<IEnumerable<ApplicationUser>>();
            var users = await _authRepository.GetAsync();

            return result.Success(data: users);

        }
        #endregion
        
        #region LoginAsync
        public async Task<Result<LoginResponse>> LoginAsync(LoginRequest req)
        {
            var result = new Result<LoginResponse>();
            // Find user by email
            var user = await _userManager.FindByEmailAsync(req.Email);

            if (user == null)
                return result.Success(message: $"{req.Email} does not exist!");
            

            // Check if password is valid
            bool isPasswordValid = await _userManager.CheckPasswordAsync(user, req.Password);
            if (!isPasswordValid)
                return result.Failure(
                    message: "Invalid Password!",
                    failureType: FailureType.Validation);

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(_secretKey);

            var roles = await _userManager.GetRolesAsync(user);

            // Define JWT
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                [
                    new (ClaimTypes.NameIdentifier, user.Id),
                    new (ClaimTypes.Email, user.Email!),
                    new (ClaimTypes.Role, roles.FirstOrDefault()!)
                ]),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            // Create JWT
            var securityToken = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);

            // Serialize the security token to string
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);

            return result.Success(data: new LoginResponse { Token = token });
        }
        #endregion

        #region LogoutAsync
        public async Task<Result<LogoutResponse>> LogoutAsync()
        {
            var result = new Result<LogoutResponse>();
            await _signInManager.SignOutAsync();
            return result.Success(message: "Logged out successfully!");
        }
        #endregion
    }
}
