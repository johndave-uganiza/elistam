using eListam.Application.DTOs.Auth;
using eListam.Application.Services.Abstractions.Auth;
using eListam.Application.Services.Abstractions.Items;
using eListam.Domain.Models;
using eListam.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public AuthRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        #endregion

        #region GetApplicationUsersAsync
        public async Task<List<ApplicationUser>> GetApplicationUsersAsync()
        {
            return await _db.ApplicationUsers.ToListAsync();
        }
        #endregion

        #region GetApplicationUserByIdAsync
        public async Task<ApplicationUser?> GetApplicationUserByIdAsync(string id)
        {
            return await _db.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == id);
        }
        #endregion
    }
}
