using Microsoft.AspNetCore.Mvc;
using System.Net;
using eListam.API.Common;
using eListam.Application.Services.Abstractions.Transactions;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class TransactionController : ControllerBase
    {
        #region Fields
        private readonly ITransactionService _service;
        #endregion

        #region Constructor
        public TransactionController(ITransactionService service)
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

        #region GetByIdAsync
        [HttpGet("{id:int}")]
        // Mirror the CreatedAtAction Action Name
        [ActionName(nameof(GetByIdAsync))]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (!result.IsSuccess)
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

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _service.DeleteAsync(id);

            if(!result.IsSuccess)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            if(result.Data == null)
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
