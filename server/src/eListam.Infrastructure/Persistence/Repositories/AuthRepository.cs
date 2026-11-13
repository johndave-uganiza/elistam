using eListam.Application.Services.Interfaces.Auth;
using eListam.Domain.Models.Entities;
using eListam.Infrastructure.Persistence.Data;
using eListam.Infrastructure.Persistence.Repositories.Generics;
using Microsoft.EntityFrameworkCore;


namespace eListam.Infrastructure.Persistence.Repositories
{
  
    public class AuthRepository : GenericRepository<ApplicationUser>, IAuthRepository
    {
        private readonly ApplicationDbContext _db;
        public AuthRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<ApplicationUser?> GetByIdAsync(string id)
        {
            return await _db.ApplicationUsers
                .FirstOrDefaultAsync(u => u.Id == id);
        }

    }
}
