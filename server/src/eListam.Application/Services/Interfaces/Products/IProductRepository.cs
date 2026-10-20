using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Interfaces.Products
{
    public interface IProductRepository
    {
        public Task<IEnumerable<Item>> GetAsync();
        public Task<Item?> GetByIdAsync(int id);
    }
}
