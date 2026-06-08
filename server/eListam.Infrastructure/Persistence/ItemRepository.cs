using eListam.Application.Interfaces;
using eListam.Domain.Models;
using eListam.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public ItemRepository(ApplicationDbContext db)
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
            return await _db.Items.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
        }
        #endregion

        #region CreateAsync
        public async Task<Item> CreateAsync(Item item)
        {
            await _db.Items.AddAsync(item);
            await SaveChangesAsync(); 
            return item;
        }
        #endregion

        #region SaveChangesAsync
        public async Task<int> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync();
        }
        #endregion

        #region DeleteAsync
        public async Task<int> DeleteAsync(Item item)
        {
            _db.Items.Remove(item);
            return await SaveChangesAsync();
        }
        #endregion
    }
}
