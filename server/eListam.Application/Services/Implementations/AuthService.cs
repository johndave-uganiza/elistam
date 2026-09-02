using eListam.Application.DTOs.Auth;
using eListam.Application.Services.Abstractions.Auth;
using eListam.Domain.Models;
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
        private readonly IAuthRepository _authRepo;
        private readonly string _secretKey;
        #endregion

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAuthRepository authRepo,
            IConfiguration config,
            IHttpContextAccessor httpContextAccessor)
        {
            _authRepo = authRepo;
            _signInManager = signInManager;
            _userManager = userManager;
            _authRepo = authRepo;
            _httpContextAccessor = httpContextAccessor;
            _secretKey = config.GetValue<string>("Jwt:SecretKey") ?? string.Empty;
        }

        public string? GetUserId() => _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        public string? GetUserEmail() => _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
        public string? GetUserName() => _httpContextAccessor.HttpContext?.User.Identity?.Name;

        #region GetApplicationUsersAsync
        public async Task<List<ApplicationUser>> GetApplicationUsersAsync()
        {
            return await _authRepo.GetApplicationUsersAsync();
        }
        #endregion

        #region LoginAsync
        public async Task<LoginResponse> LoginAsync(LoginRequest req)
        {
            // Find user by email
            var user = await _userManager.FindByEmailAsync(req.Email);

            if (user == null)
            {
                return new LoginResponse();
            }

            // Check if password is valid
            bool isPasswordValid = await _userManager.CheckPasswordAsync(user, req.Password);
            if (!isPasswordValid)
            {
                return new LoginResponse()
                {
                    Token = string.Empty
                };
            }

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(_secretKey);

            var roles = await _userManager.GetRolesAsync(user);

            // Define JWT
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                [
                    new (ClaimTypes.NameIdentifier, user.Id),
                    new (ClaimTypes.Email, user.Email!),
                    new (ClaimTypes.Role, roles.FirstOrDefault()!)
                ]),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            // Create JWT
            SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);

            // Serialize the security token to string
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);

            return new LoginResponse()
            {
                Token = token,
            };
        }
        #endregion

        #region LogoutAsync
        public async Task<LogoutResponse> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return new LogoutResponse();
        }
        #endregion
    }
}
