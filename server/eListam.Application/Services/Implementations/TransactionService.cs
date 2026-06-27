using eListam.Application.Common;
using eListam.Application.DTOs.Transactions;
using eListam.Application.Services.Abstractions.Transactions;
using eListam.Domain.Models;

namespace eListam.Application.Services.Implementations
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepo;

        #region Constructor
        public TransactionService(ITransactionRepository transactionRepo)
        {
            _transactionRepo = transactionRepo;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetTransactionResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetTransactionResponse>>();

            var transactions = await _transactionRepo.GetAsync();

            if(transactions == null)
                return result.Success($"There are no existing transactions!");
            
            return result.Success(transactions.Select(MapGetTransactionResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetTransactionResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetTransactionResponse>();

            var transaction = await _transactionRepo.GetByIdAsync(id);

            if (transaction == null)
                return result.Success($"{nameof(Transaction)} does not exist!");

            return result.Success(MapGetTransactionResponse(transaction));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetTransactionResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetTransactionResponse>();

            var transaction = await _transactionRepo.GetByIdAsync(id);
            if (transaction == null)
                return result.Success($"The transaction doesn't exist!");

            await _transactionRepo.DeleteAsync(transaction);

            return result.Success(MapGetTransactionResponse(transaction));
        }
        #endregion

        #region Mappers

        #region MapGetTransactionResponse
        private GetTransactionResponse MapGetTransactionResponse(Transaction transaction)
        {
            return new GetTransactionResponse()
            {
                Id = transaction.Id,
                OrderNumber = transaction.OrderNumber,
                TotalPrice = transaction.TotalPrice,
                TotalQuantity = transaction.TotalQuantity,
                TransactionDetails = transaction.TransactionDetails?.Select(td =>
                new GetTransactionDetailResponse()
                {
                    Description = td.Description,
                    Id = td.Id,
                    Image = td.Image,
                    Name = td.Name,
                    Price = td.Price,
                    ProductId = td.ItemId,
                    Quantity = td.Quantity,
                    TransactionId = td.TransactionId
                })
            };
        }
        #endregion

        #endregion
    }
}
