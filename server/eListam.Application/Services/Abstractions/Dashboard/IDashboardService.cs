using eListam.Application.Common;
using eListam.Application.DTOs.Dashboard;
using eListam.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Abstractions.Dashboard
{
    public interface IDashboardService
    {
        public Task<Result<GetDashboardResponse>> GetAsync();
    }
}
