using eListam.Domain.Models;

namespace eListam.Application.Interfaces
{
    public interface IItemRepository
    {
        public Task<IEnumerable<Item>> GetAsync();
        public Task<Item?> GetByIdAsync(int id);
        public Task<Item> CreateAsync(Item item);
        public Task<int> SaveChangesAsync();
        public Task<int> DeleteAsync(Item item);
    }
}
