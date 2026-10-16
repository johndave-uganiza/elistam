using eListam.Application.Common;
using eListam.Application.Common.Interfaces;
using eListam.Application.DTOs.Transactions;
using eListam.Application.Services.Abstractions.Transactions;
using eListam.Domain.Constants;
using eListam.Domain.Models;
using System.Data;
using System.Text;

namespace eListam.Application.Services.Implementations
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepo;
        private readonly IDocumentNumberGenerator _documentNumberGenerator;

        #region Constructor
        public TransactionService(ITransactionRepository transactionRepo, IDocumentNumberGenerator documentNumberGenerator)
        {
            _transactionRepo = transactionRepo;
            _documentNumberGenerator = documentNumberGenerator;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetTransactionResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetTransactionResponse>>();

            var transactions = (await _transactionRepo.GetAsync())?.OrderByDescending(o => o.Id);
            
            if (transactions == null)
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

        #region CreateAsync
        public async Task<Result<GetTransactionResponse>> CreateAsync(CreateTransactionRequest req)
        {
            var result = new Result<GetTransactionResponse>();

            var transactionNumber = await _documentNumberGenerator.GenerateDocumentNumberAsync(DocumentType.Transaction);

            var transaction = await _transactionRepo.CreateAsync(new Transaction()
            {
                TransactionNumber = transactionNumber,
                Date = req.Date,
                IsCompleted = req.IsCompleted,
                OrderNumber = req.OrderNumber,
                TotalPrice = req.TotalPrice,
                TotalQuantity = req.TotalQuantity,
                OrderId = req.OrderId,    
                TransactionDetails = req.TransactionDetails.Select(td => new TransactionDetail()
                {
                    Description = td.Description,
                    Image = td.Image,
                    ItemId = td.ItemId,
                    Name = td.Name,
                    Price = td.Price,
                    Quantity = td.Quantity,
                }).ToList()
            });

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

        #region ExportAsync
        public async Task<Result<ExportTransactionResponse>> ExportCsvAsync(int id)
        {
            var result = new Result<ExportTransactionResponse>();

            var transaction = await _transactionRepo.GetByIdAsync(id);
            if (transaction != null)
            {
                var csv = new StringBuilder();
                csv.AppendLine("Transaction_Id,Transaction_Number,Order_Number,Date,Total_Quantity,Total_Price");
                csv.AppendLine(
                    $"{transaction.Id}," +
                    $"{transaction.TransactionNumber}," +
                    $"{transaction.OrderNumber}," +
                    $"{transaction.Date}," +
                    $"{transaction.TotalQuantity}," +
                    $"{transaction.TotalPrice}");

                var exportCsvData = new ExportTransactionResponse
                {
                    CsvData = Encoding.UTF8.GetBytes(csv.ToString())
                };
                
                return result.Success(exportCsvData);
               
            }

            return result.Failure();
        }
        #endregion

        #region MapGetTransactionResponse
        private GetTransactionResponse MapGetTransactionResponse(Transaction tran)
        {
            return new GetTransactionResponse()
            {
                Id = tran.Id,
                TransactionNumber = tran.TransactionNumber,
                OrderNumber = tran.OrderNumber,
                Date = tran.Date,
                TotalPrice = tran.TotalPrice,
                TotalQuantity = tran.TotalQuantity,
                TransactionDetails = tran.TransactionDetails?.Select(td =>
                new GetTransactionDetailResponse()
                {
                    Description = td.Description,
                    Id = td.Id,
                    Image = td.Image,
                    Name = td.Name,
                    Price = td.Price,
                    ItemId = td.ItemId,
                    Quantity = td.Quantity,
                    TransactionId = td.TransactionId
                })
            };
        }
        #endregion
    }
}
