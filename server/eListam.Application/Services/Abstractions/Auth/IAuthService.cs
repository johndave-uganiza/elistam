using eListam.Application.Common;
using eListam.Application.DTOs.Auth;
using eListam.Domain.Models;

namespace eListam.Application.Services.Abstractions.Auth
{
    public interface IAuthService
    {
        public Task<List<ApplicationUser>> GetApplicationUsersAsync();
        public Task<List<ApplicationUser>> GetApplicationUserByIdAsync(string id);
        public Task<LoginResponse> LoginAsync(LoginRequest req);
        public Task<LogoutResponse> LogoutAsync();
    }
}
