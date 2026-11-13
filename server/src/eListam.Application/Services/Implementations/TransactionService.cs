using eListam.Application.Common;
using eListam.Application.DTOs.Transactions;
using eListam.Application.Services.Interfaces.Common;
using eListam.Application.Services.Interfaces.Transactions;
using eListam.Domain.Constants;
using eListam.Domain.Models.Entities;
using System.Data;
using System.Text;

namespace eListam.Application.Services.Implementations
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepo;
        private readonly IDocumentNumberGenerator _documentNumberGenerator;
        private readonly IUnitOfWork _unitOfWork;

        #region Constructor
        public TransactionService(
            ITransactionRepository transactionRepo,
            IDocumentNumberGenerator documentNumberGenerator,
            IUnitOfWork unitOfWork)
        {
            _transactionRepo = transactionRepo;
            _documentNumberGenerator = documentNumberGenerator;
            _unitOfWork = unitOfWork;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetTransactionResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetTransactionResponse>>();

            var transactions = await _transactionRepo.GetAsync();
            var orderedTransactions = transactions.OrderByDescending(o => o.Id);
            
            if (transactions == null)
                return result.Success(message: "There are no existing transactions!");
            
            return result.Success(orderedTransactions.Select(MapGetTransactionResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetTransactionResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetTransactionResponse>();

            var transaction = await _transactionRepo.GetByIdAsync(id);

            if (transaction == null)
                return result.Success(message: "Transaction does not exist!");

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
                Date = DateTime.Now,
                IsCompleted = req.IsCompleted,
                OrderNumber = req.OrderNumber,
                PaymentMethod = req.PaymentMethod,
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

            // ConfirmOrderAsync commits the transaction

            return result.Success(MapGetTransactionResponse(transaction));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetTransactionResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetTransactionResponse>();

            var transaction = await _transactionRepo.GetByIdAsync(id);
            if (transaction == null)
                return result.Failure(message: "The transaction doesn't exist!", failureType: FailureType.NotFound);

            _transactionRepo.Delete(transaction);
            await _unitOfWork.SaveChangesAsync();

            return result.Success(MapGetTransactionResponse(transaction));
        }
        #endregion

        #region ExportAsync
        public async Task<Result<ExportTransactionResponse>> ExportCsvAsync()
        {
            var result = new Result<ExportTransactionResponse>();
            var csv = new StringBuilder();

            var transactions = await _transactionRepo.GetAsync();

            if (transactions.Any())
            {
                csv.AppendLine(
                    "Transaction_Id," +
                    "Transaction_Number," +
                    "Order_Number," +
                    "Date," +
                    "Total_Quantity," +
                    "Total_Price");
                
                foreach (var transaction in transactions)
                {
                    csv.AppendLine(
                        $"{transaction.Id}," +
                        $"{transaction.TransactionNumber}," +
                        $"{transaction.OrderNumber}," +
                        $"{transaction.Date.ToString("MM/dd/yyy")}," +
                        $"{transaction.TotalQuantity}," +
                        $"{transaction.TotalPrice}");
                }

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
                PaymentMethod = tran.PaymentMethod,
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
