using eListam.API.Common;
using eListam.Application.DTOs.Orders;
using eListam.Application.Services.Abstractions.Auth;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Abstractions.Orders;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class OrderController : ControllerBase
    {
        #region Fields
        private readonly IOrderService _orderService;
        #endregion

        #region Constructor
        public OrderController(IOrderService orderService,
            IItemService itemService)
        {
            _orderService = orderService;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _orderService.GetAsync();

            if (!result.IsSuccess)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
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
        // Mirror the CreatedAtAction Name from CreateAsync
        [ActionName(nameof(GetByIdAsync))]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _orderService.GetByIdAsync(id);

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

        #region CreateAsync
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateOrderRequest req)
        {
            var result = await _orderService.CreateAsync(req);

            if (result.Data == null)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            if (string.IsNullOrEmpty(result.Data.UserId))
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = false,
                    Messages = [result.Message]
                });
            }

            return Ok(new ApiResponse()
            {
                StatusCode = HttpStatusCode.Created,
                IsSuccess = result.IsSuccess,
                Data = result.Data,
                Messages = [result.Message]
            });
        }
        #endregion

        #region UpdateAsync
        [HttpPut("{id:int}")]
        //[ActionName(nameof(UpdateAsync))]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] UpdateOrderRequest req)
        {
            var result = await _orderService.UpdateAsync(id, req);

            if (result.Data == null)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            if (string.IsNullOrEmpty(result.Data.UserId))
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = false,
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
        //[ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _orderService.DeleteAsync(id);

            if (result.Data == null)
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            if (string.IsNullOrEmpty(result.Data.UserId))
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = false,
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

        #region ConfirmOrderAsync
        [HttpPost("{id:int}/confirm")]
        public async Task<IActionResult> ConfirmOderAsync(int id)
        {
            var result = await _orderService.ConfirmOrderAsync(id);

            if (result.Data == null)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }

            if (string.IsNullOrEmpty(result.Data.UserId))
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = false,
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
