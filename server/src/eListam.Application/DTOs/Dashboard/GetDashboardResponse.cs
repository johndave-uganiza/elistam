using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.DTOs.Dashboard
{
    public class GetDashboardResponse
    {
        public int Year { get; set; }
        public decimal Revenue { get; set;  }
        public decimal COGS { get; set;  }
        public decimal GrossProfit { get; set; }
        public decimal NetProfit { get; set;  }
        public decimal OperatingExpenses { get; set; }
        public decimal StockAmount { get; set; }
        public IEnumerable<GetMonthlyFinancialResponse> MonthlyFinancials { get; set; } = [];
        public IEnumerable<GetStockAlertResponse> StockAlerts { get; set; } = [];
    }

    public class GetMonthlyFinancialResponse
    {
        public int Month { get; set; }
        public decimal Revenue { get; set; }
        public decimal COGS { get; set; }
        public decimal OperatingExpenses { get; set; }
    }

    public class GetStockAlertResponse
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public decimal Stock { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string AlertType { get; set; } = string.Empty;
    }
}
