using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Interfaces.Transactions
{
    public interface ITransactionRepository
    {
        public Task<IEnumerable<Transaction>> GetAsync();
        public Task<Transaction?> GetByIdAsync(int id);
        public Task<Transaction> CreateAsync(Transaction transaction);
        public void Update(Transaction transaction);
        public void Delete(Transaction transaction);
    }
}
