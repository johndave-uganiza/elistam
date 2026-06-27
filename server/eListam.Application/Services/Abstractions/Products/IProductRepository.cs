using eListam.Domain.Models;

namespace eListam.Application.Services.Abstractions.Products
{
    public interface IProductRepository
    {
        public Task<IEnumerable<Item>> GetAsync();
        public Task<Item?> GetByIdAsync(int id);
    }
}
