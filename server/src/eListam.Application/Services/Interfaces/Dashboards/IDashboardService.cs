using eListam.Application.DTOs.Dashboard;

namespace eListam.Application.Services.Interfaces.Dashboards
{
    public interface IDashboardService
    {
        public Task<Result<GetDashboardResponse>> GetAsync();
    }
}
