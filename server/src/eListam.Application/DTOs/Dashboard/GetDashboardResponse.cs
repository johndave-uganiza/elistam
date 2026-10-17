using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.DTOs.Dashboard
{
    public class GetDashboardResponse
    {
        public double Revenue { get; set;  }
        public double COGS { get; set;  }
        public double GrossProfit { get; set; }
        public double NetProfit { get; set;  }
        public double StockAmount { get; set; }
    }
}
