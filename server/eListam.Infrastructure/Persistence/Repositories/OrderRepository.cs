using eListam.Application.Services.Abstractions.Orders;
using eListam.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public OrderRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        #endregion

        #region GetAsync
        public async Task<IEnumerable<Order>> GetAsync()
        {
            return await _db.Orders.Include(o => o.OrderDetails).ToListAsync();
        }
        #endregion

        #region GetByIdAsync
        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _db.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(item => item.Id == id);
        }
        #endregion

        #region CreateAsync
        public async Task<Order> CreateAsync(Order order)
        {
            await _db.Orders.AddAsync(order); 
            return order;
        }
        #endregion

        #region DeleteAsync
        public async Task DeleteAsync(Order order)
        {
            _db.Orders.Remove(order);
        }
        #endregion
    }
}
