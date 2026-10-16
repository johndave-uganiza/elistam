using eListam.Application.Common;
using eListam.Application.DTOs.Dashboard;
using eListam.Application.DTOs.Items;
using eListam.Application.DTOs.Transactions;
using eListam.Application.Services.Abstractions.Dashboard;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Abstractions.Transactions;

namespace eListam.Application.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        #region Fields
        private readonly ITransactionRepository _transactionRepository;
        private readonly IItemRepository _itemRepository;
        #endregion

        #region Constructor
        public DashboardService(ITransactionRepository transactionRepository, IItemRepository itemRepository)
        {
            _transactionRepository = transactionRepository;
            _itemRepository = itemRepository;
        }
        #endregion

        #region GetAsync
        public async Task<Result<GetDashboardResponse>> GetAsync()
        {
            var result = new Result<GetDashboardResponse>();

            var transactions  = await _transactionRepository.GetAsync();
            var items = await _itemRepository.GetAsync();

            var transactionDetails = transactions
                .SelectMany(t => t.TransactionDetails)
                .Join(
                    items,
                    td => td.ItemId,
                    item => item.Id,
                    (td, item) => new
                    {
                        item.Id,
                        item.Name,
                        item.Cost,
                        item.Price,
                        td.Quantity
                    }
                );

            var totalRevenue = transactionDetails.Sum(o => o.Price * o.Quantity);
            var totalCOGS = transactionDetails.Sum(o => o.Cost * o.Quantity); ;
            var totalGrossProfit = totalRevenue - totalCOGS;
            var totalStockAmount = items.Sum(o => o.Cost * o.Stock);

            return result.Success(new GetDashboardResponse()
            {
                Revenue = totalRevenue,
                COGS = totalCOGS,
                GrossProfit = totalGrossProfit,
                NetProfit = totalGrossProfit,
                StockAmount = totalStockAmount
            });
        }
        #endregion
    }
}
