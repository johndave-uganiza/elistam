using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Interfaces.Items
{
    public interface IItemRepository
    {
        public Task<IEnumerable<Item>> GetAsync();
        public Task<Item?> GetByIdAsync(int id);
        public Task<Item> CreateAsync(Item item);
        public void Update(Item item);
        public void Delete(Item item);
    }
}
