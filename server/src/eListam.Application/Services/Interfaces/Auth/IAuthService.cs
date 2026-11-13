using eListam.Application.Common;
using eListam.Application.DTOs.Auth;
using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Interfaces.Auth
{
    public interface IAuthService
    {
        public Result<string> GetUserId();
        public Result<string> GetUserEmail();
        public Result<string> GetUserName();
        public Task<Result<IEnumerable<ApplicationUser>>> GetAsync();
        public Task<Result<LoginResponse>> LoginAsync(LoginRequest req);
        public Task<Result<LogoutResponse>> LogoutAsync();
    }
}
