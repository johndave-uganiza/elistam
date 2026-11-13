using eListam.Domain.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Interfaces.Auth
{
    public interface IAuthRepository
    {
        public Task<IEnumerable<ApplicationUser>> GetAsync();
        public Task<ApplicationUser?> GetByIdAsync(string id);
    }
}
