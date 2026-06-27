using eListam.Domain.Models;

namespace eListam.Application.Services.Abstractions.Orders
{
    public interface IOrderRepository
    {
        public Task<IEnumerable<Order>> GetAsync();
        public Task<Order?> GetByIdAsync(int id);
        public Task<Order> CreateAsync(Order item);
        public Task<int> SaveChangesAsync();
        public Task<int> DeleteAsync(Order item);
    }
}
