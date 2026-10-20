using eListam.Application.DTOs.Auth;
using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Interfaces.Auth
{
    public interface IAuthService
    {
        public string? GetUserId();
        public string? GetUserEmail();
        public string? GetUserName();
        public Task<IEnumerable<ApplicationUser>> GetAsync();
        public Task<LoginResponse> LoginAsync(LoginRequest req);
        public Task<LogoutResponse> LogoutAsync();
    }
}
