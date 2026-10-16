using eListam.API.Common;
using eListam.Application.Services.Abstractions.Dashboard;
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

            if(!result.IsSuccess)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            if (result.Data == null)
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            return Ok(new ApiResponse()
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = result.IsSuccess,
                Data = result.Data,
                Messages = [result.Message]
            });
        }
        #endregion

    }
}
