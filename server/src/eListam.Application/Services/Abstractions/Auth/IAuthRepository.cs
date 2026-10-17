using eListam.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Abstractions.Auth
{
    public interface IAuthRepository
    {
        public Task<List<ApplicationUser>> GetApplicationUsersAsync();
        public Task<ApplicationUser?> GetApplicationUserByIdAsync(string id);
    }
}
