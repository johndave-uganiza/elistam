using eListam.Domain.Models;

namespace eListam.Application.Services.Abstractions.Transactions
{
    public interface ITransactionRepository
    {
        public Task<IEnumerable<Transaction>> GetAsync();
        public Task<Transaction?> GetByIdAsync(int id);
        public Task<Transaction> CreateAsync(Transaction transaction);
        public Task<int> DeleteAsync(Transaction transaction);
    }
}
