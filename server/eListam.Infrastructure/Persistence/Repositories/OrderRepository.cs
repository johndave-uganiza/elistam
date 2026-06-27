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
            return await _db.Orders.AsNoTracking().ToListAsync();
        }
        #endregion

        #region GetByIdAsync
        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _db.Orders
                .AsNoTracking()
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(item => item.Id == id);
        }
        #endregion

        #region CreateAsync
        public async Task<Order> CreateAsync(Order order)
        {
            await _db.Orders.AddAsync(order);
            await SaveChangesAsync(); 
            return order;
        }
        #endregion

        #region SaveChangesAsync
        public async Task<int> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync();
        }
        #endregion

        #region DeleteAsync
        public async Task<int> DeleteAsync(Order order)
        {
            _db.Orders.Remove(order);
            return await SaveChangesAsync();
        }
        #endregion
    }
}
