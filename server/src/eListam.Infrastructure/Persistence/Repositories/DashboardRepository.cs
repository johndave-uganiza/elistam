using eListam.Application.Services.Interfaces.Dashboards;
using eListam.Domain.Models.ReadModels;
using eListam.Infrastructure.Persistence.Data;
using eListam.Infrastructure.Persistence.Repositories.Generics;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class DashboardRepository : GenericRepository<Dashboard>, IDashboardRepository
    {
        public DashboardRepository(ApplicationDbContext db) : base(db) 
        {

        }
    }
}
