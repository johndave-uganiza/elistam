using eListam.Application.DTOs.Dashboard;
using eListam.Application.Services.Interfaces.Dashboards;

namespace eListam.Application.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        #region Fields
        private readonly IDashboardRepository _dashboardRepository;
        #endregion

        #region Constructor
        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }
        #endregion

        #region GetAsync
        public async Task<Result<GetDashboardResponse>> GetAsync()
        {
            var result = new Result<GetDashboardResponse>();

            var dashboard  = await _dashboardRepository.GetAsync();
            var data = dashboard.FirstOrDefault();

            if (data == null)
            {
                return result.Success();
            }
                
            return result.Success(new GetDashboardResponse()
            {
                Revenue = data.Revenue,
                COGS = data.COGS,
                GrossProfit = data.Gross,
                NetProfit = data.Net,
            });
        }
        #endregion
    }
}
