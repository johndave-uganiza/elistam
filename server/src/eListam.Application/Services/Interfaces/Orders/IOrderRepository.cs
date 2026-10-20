using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Interfaces.Orders
{
    public interface IOrderRepository
    {
        public Task<IEnumerable<Order>> GetAsync();
        public Task<Order?> GetByIdAsync(int id);
        public Task<Order> CreateAsync(Order order);
        public void Update(Order order);
        public void Delete(Order order);
    }
}
