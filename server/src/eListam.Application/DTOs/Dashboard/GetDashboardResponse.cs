using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.DTOs.Dashboard
{
    public class GetDashboardResponse
    {
        public decimal Revenue { get; set;  }
        public decimal COGS { get; set;  }
        public decimal GrossProfit { get; set; }
        public decimal NetProfit { get; set;  }
        public decimal StockAmount { get; set; }
    }
}
