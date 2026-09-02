using eListam.Application.Services.Abstractions.Transactions;
using eListam.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _db;

        #region Constructor
        public TransactionRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        #endregion

        #region GetAsync
        public async Task<IEnumerable<Transaction>> GetAsync()
        {
            return await _db.Transactions
                .Include(o => o.TransactionDetails)
                .AsNoTracking()
                .ToListAsync();
        }
        #endregion

        #region GetByIdAsync
        public async Task<Transaction?> GetByIdAsync(int id)
        {
            return await _db.Transactions.FirstOrDefaultAsync(transaction => transaction.Id == id);
        }
        #endregion

        #region CreateAsync
        public async Task<Transaction> CreateAsync(Transaction transaction)
        {
            await _db.Transactions.AddAsync(transaction);
            await SaveChangesAsync(); 
            return transaction;
        }
        #endregion

        #region DeleteAsync
        public async Task<int> DeleteAsync(Transaction transaction)
        {
            _db.Transactions.Remove(transaction);
            return await SaveChangesAsync();
        }
        #endregion

        #region SaveChangesAsync
        public async Task<int> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync();
        }
        #endregion
    }
}