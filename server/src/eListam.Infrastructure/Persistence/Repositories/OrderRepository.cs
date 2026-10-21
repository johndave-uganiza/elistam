using eListam.Application.Services.Interfaces.Orders;
using eListam.Domain.Models.Entities;
using eListam.Infrastructure.Persistence.Data;
using eListam.Infrastructure.Persistence.Repositories.Generics;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public OrderRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        #endregion

        #region GetAsync
        public async override Task<IEnumerable<Order>> GetAsync()
        {
            return await _db.Orders
                .Include(o => o.OrderDetails)
                .AsNoTracking()
                .ToListAsync();
        }
        #endregion

        #region GetByIdAsync
        public async override Task<Order?> GetByIdAsync(int id)
        {
            return await _db.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(item => item.Id == id);
        }
        #endregion
    }
}
