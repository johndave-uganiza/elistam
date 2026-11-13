using eListam.Domain.Models.ReadModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Interfaces.Dashboards
{
    public interface IDashboardRepository
    {
        public Task<IEnumerable<Dashboard>> GetAsync();
    }
}
