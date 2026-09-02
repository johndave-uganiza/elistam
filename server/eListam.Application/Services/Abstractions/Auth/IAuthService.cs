using eListam.Application.Common;
using eListam.Application.DTOs.Auth;
using eListam.Domain.Models;
using System.Security.Claims;

namespace eListam.Application.Services.Abstractions.Auth
{
    public interface IAuthService
    {
        public string? GetUserId();
        public string? GetUserEmail();
        public string? GetUserName();
        public Task<List<ApplicationUser>> GetApplicationUsersAsync();
        public Task<LoginResponse> LoginAsync(LoginRequest req);
        public Task<LogoutResponse> LogoutAsync();
    }
}
