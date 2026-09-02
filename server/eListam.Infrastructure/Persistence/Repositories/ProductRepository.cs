using eListam.Application.Services.Abstractions.Products;
using eListam.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public ProductRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        #endregion

        #region GetAsync
        public async Task<IEnumerable<Item>> GetAsync()
        {
            return await _db.Items.AsNoTracking().ToListAsync();
        }
        #endregion

        #region GetByIdAsync
        public async Task<Item?> GetByIdAsync(int id)
        {
            return await _db.Items.FirstOrDefaultAsync(item => item.Id == id);
        }
        #endregion
    }
}
