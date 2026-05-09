using Azure;
using eListamAPI.Data;
using eListamAPI.DTOs;
using eListamAPI.DTOs.Orders;
using eListamAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class OrderDetailController : ControllerBase
    {
        #region Fields
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        #endregion

        #region Constructor
        public OrderDetailController(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }
        #endregion

        #region UpdateAsync
        [HttpPut("{id:int}")]
        [ActionName(nameof(UpdateAsync))]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] UpdateOrderDetailRequest req)
        {
            ApiResponse apiResponse = new ApiResponse();

            if (!ModelState.IsValid)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;

                foreach (var value in ModelState.Values)
                {
                    var errorMessages = new List<string>();
                    foreach (var error in value.Errors)
                    {
                        errorMessages.Add(error.ErrorMessage);
                    }
                    apiResponse.Messages = errorMessages;
                }

                return BadRequest(apiResponse);
            }

            if (id != req.OrderDetailId || id == 0)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                return BadRequest(apiResponse);
            }

            var existingOrderDetail = await _db.OrderDetails
                .FirstOrDefaultAsync(o => o.Id == id);

            if (existingOrderDetail == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                return NotFound(apiResponse);
            }

            existingOrderDetail.Quantity = req.Quantity;

            await _db.SaveChangesAsync();

            // Do not pass existingOrder directly to avoid circular reference issues when using .Include()
            var getOrderDetailResponse = new GetOrderDetailResponse()
            {
                Quantity = existingOrderDetail.Quantity,
                Description = existingOrderDetail.Description,
                Image = existingOrderDetail.Image,
                Name = existingOrderDetail.Name,
                OrderDetailId = existingOrderDetail.Id,
                Price = existingOrderDetail.Price,
                ProductId = existingOrderDetail.ProductId
            };
            apiResponse.Data = getOrderDetailResponse;
            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            return Ok(apiResponse);
        }
        #endregion
    }
}
