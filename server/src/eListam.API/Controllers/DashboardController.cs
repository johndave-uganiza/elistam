using eListam.API.Common;
using eListam.Application.Services.Interfaces.Dashboards;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class DashboardController : ControllerBase
    {
        #region Fields
        private readonly IDashboardService _service;
        #endregion

        #region Constructor
        public DashboardController(IDashboardService service)
        {
            _service = service;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _service.GetAsync();
            return this.GetObjectResult(result);
        }
        #endregion

    }
}
