using eListam.Application.Common;
using eListam.Application.DTOs.Dashboard;
using eListam.Application.Services.Interfaces.Dashboards;
using eListam.Application.Services.Interfaces.Items;

namespace eListam.Application.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        #region Fields
        private readonly IDashboardRepository _dashboardRepository;
        private readonly IItemRepository _itemRepository;
        #endregion

        #region Constructor
        public DashboardService(
            IDashboardRepository dashboardRepository,
            IItemRepository itemRepository)
        {
            _dashboardRepository = dashboardRepository;
            _itemRepository = itemRepository;
        }
        #endregion

        #region GetAsync
        public async Task<Result<GetDashboardResponse>> GetAsync()
        {
            var result = new Result<GetDashboardResponse>();

            var dashboard = await _dashboardRepository.GetAsync();
            var items = await _itemRepository.GetAsync();

            var year = DateTime.Now.Year;
            var monthlyData = dashboard
                .Where(data => data.Year == year)
                .ToDictionary(data => data.Month);
            var monthlyFinancials = Enumerable.Range(1, 12)
                .Select(month =>
                {
                    monthlyData.TryGetValue(month, out var data);
                    return new GetMonthlyFinancialResponse
                    {
                        Month = month,
                        Revenue = data?.Revenue ?? 0,
                        COGS = data?.COGS ?? 0,
                        OperatingExpenses = data?.OperatingExpenses ?? 0,
                    };
                })
                .ToList();

            var today = DateTime.Today;
            var expirationCutoff = today.AddMonths(3);
            var stockAlerts = items
                .Where(item =>
                    item.Stock <= 5 ||
                    (item.ExpirationDate.HasValue &&
                    item.ExpirationDate.Value.Date <= expirationCutoff))
                .OrderBy(item => item.ExpirationDate)
                .Select(item =>
                {
                    var expirationDate = item.ExpirationDate?.Date;
                    var alertType = item.Stock <= 0
                        ? "OutOfStock"
                        : expirationDate.HasValue && expirationDate.Value < today
                            ? "Expired"
                            : item.Stock <= 5
                                ? "LowStock"
                                : "ExpiringSoon";

                    return new GetStockAlertResponse
                    {
                        ItemId = item.Id,
                        ItemName = item.Name,
                        Stock = item.Stock,
                        ExpirationDate = item.ExpirationDate,
                        AlertType = alertType,
                    };
                })
                .ToList();

            var revenue = monthlyFinancials.Sum(data => data.Revenue);
            var cogs = monthlyFinancials.Sum(data => data.COGS);
            var operatingExpenses = monthlyFinancials.Sum(data => data.OperatingExpenses);

            return result.Success(new GetDashboardResponse
            {
                Year = year,
                Revenue = revenue,
                COGS = cogs,
                GrossProfit = revenue - cogs,
                NetProfit = revenue - cogs - operatingExpenses,
                OperatingExpenses = operatingExpenses,
                MonthlyFinancials = monthlyFinancials,
                StockAlerts = stockAlerts,
            });
        }
        #endregion
    }
}
