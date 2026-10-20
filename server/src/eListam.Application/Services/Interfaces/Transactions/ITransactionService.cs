using eListam.Application.DTOs.Transactions;


namespace eListam.Application.Services.Interfaces.Transactions
{
    public interface ITransactionService
    {
        public Task<Result<IEnumerable<GetTransactionResponse>>> GetAsync();
        public Task<Result<GetTransactionResponse>> GetByIdAsync(int id);
        public Task<Result<GetTransactionResponse>> CreateAsync(CreateTransactionRequest req);
        public Task<Result<GetTransactionResponse>> DeleteAsync(int id);
        public Task<Result<ExportTransactionResponse>> ExportCsvAsync(int id);
    }
}
