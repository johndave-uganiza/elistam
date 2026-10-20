using eListam.Application.Services.Interfaces.Transactions;
using eListam.Domain.Models.Entities;
using eListam.Infrastructure.Persistence.Data;
using eListam.Infrastructure.Persistence.Repositories.Generics;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public TransactionRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        #endregion

        #region GetAsync
        public override async Task<IEnumerable<Transaction>> GetAsync()
        {
            return await _db.Transactions
                .Include(o => o.TransactionDetails)
                .AsNoTracking()
                .ToListAsync();
        }
        #endregion   
    }
}