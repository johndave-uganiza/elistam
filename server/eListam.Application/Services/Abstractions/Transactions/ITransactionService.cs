using eListam.Application.Common;
using eListam.Application.DTOs.Transactions;


namespace eListam.Application.Services.Abstractions.Transactions
{
    public interface ITransactionService
    {
        public Task<Result<IEnumerable<GetTransactionResponse>>> GetAsync();
        public Task<Result<GetTransactionResponse>> GetByIdAsync(int id);
        public Task<Result<GetTransactionResponse>> DeleteAsync(int id);
    }
}
