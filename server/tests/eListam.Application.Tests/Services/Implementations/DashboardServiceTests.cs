using eListam.Application.Services.Implementations;
using eListam.Application.Services.Interfaces.Dashboards;
using eListam.Application.Services.Interfaces.Items;
using eListam.Domain.Models.Entities;
using eListam.Domain.Models.ReadModels;
using Moq;

namespace eListam.Application.Tests.Services.Implementations
{
    public class DashboardServiceTests
    {
        [Fact]
        public async Task GetAsync_ReturnsCurrentYearMonthlyFinancialsAndQualifyingStockAlerts()
        {
            var year = DateTime.Now.Year;
            var today = DateTime.Today;
            var dashboardRepository = new Mock<IDashboardRepository>();
            var itemRepository = new Mock<IItemRepository>();
            dashboardRepository
                .Setup(repository => repository.GetAsync())
                .ReturnsAsync(
                [
                    new Dashboard
                    {
                        Year = year,
                        Month = 1,
                        Revenue = 100,
                        COGS = 40,
                        OperatingExpenses = 10,
                    },
                    new Dashboard
                    {
                        Year = year - 1,
                        Month = 1,
                        Revenue = 500,
                    },
                ]);
            itemRepository
                .Setup(repository => repository.GetAsync())
                .ReturnsAsync(
                [
                    new Item
                    {
                        Id = 1,
                        Name = "Qualifying item",
                        Stock = 5,
                        ExpirationDate = today.AddMonths(3),
                    },
                    new Item
                    {
                        Id = 2,
                        Name = "Too much stock",
                        Stock = 6,
                        ExpirationDate = today.AddMonths(1),
                    },
                    new Item
                    {
                        Id = 3,
                        Name = "Expires too late",
                        Stock = 5,
                        ExpirationDate = today.AddMonths(4),
                    },
                    new Item
                    {
                        Id = 4,
                        Name = "Already expired",
                        Stock = 1,
                        ExpirationDate = today.AddDays(-1),
                    },
                    new Item
                    {
                        Id = 5,
                        Name = "Out of stock",
                    },
                ]);
            var service = new DashboardService(
                dashboardRepository.Object,
                itemRepository.Object);

            var result = await service.GetAsync();

            Assert.NotNull(result.Data);
            Assert.Equal(year, result.Data.Year);
            Assert.Equal(12, result.Data.MonthlyFinancials.Count());
            Assert.Equal(100, result.Data.Revenue);
            Assert.Equal(40, result.Data.COGS);
            Assert.Equal(60, result.Data.GrossProfit);
            Assert.Equal(50, result.Data.NetProfit);
            Assert.Equal(0, result.Data.MonthlyFinancials.Single(month => month.Month == 2).Revenue);
            Assert.Equal("LowStock", result.Data.StockAlerts.Single(alert => alert.ItemId == 1).AlertType);
            Assert.Equal("ExpiringSoon", result.Data.StockAlerts.Single(alert => alert.ItemId == 2).AlertType);
            Assert.Equal("LowStock", result.Data.StockAlerts.Single(alert => alert.ItemId == 3).AlertType);
            Assert.Equal("Expired", result.Data.StockAlerts.Single(alert => alert.ItemId == 4).AlertType);
            Assert.Equal("OutOfStock", result.Data.StockAlerts.Single(alert => alert.ItemId == 5).AlertType);
        }
    }
}
