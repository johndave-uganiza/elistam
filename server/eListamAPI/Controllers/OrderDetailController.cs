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
            ApiResponse response = new ApiResponse();

            if (!ModelState.IsValid)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.IsSuccess = false;

                foreach (var value in ModelState.Values)
                {
                    var errorMessages = new List<string>();
                    foreach (var error in value.Errors)
                    {
                        errorMessages.Add(error.ErrorMessage);
                    }
                    response.Messages = errorMessages;
                }

                return BadRequest(response);
            }

            if (id != req.OrderDetailId || id == 0)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.IsSuccess = false;
                return BadRequest(response);
            }

            var existingOrderDetail = await _db.OrderDetails
                .FirstOrDefaultAsync(o => o.Id == id);

            if (existingOrderDetail == null)
            {
                response.StatusCode = HttpStatusCode.NotFound;
                response.IsSuccess = false;
                return NotFound(response);
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
                ProductId = existingOrderDetail.ItemId
            };
            response.Data = getOrderDetailResponse;
            response.StatusCode = HttpStatusCode.OK;
            response.IsSuccess = true;
            return Ok(response);
        }
        #endregion

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id, DeleteOrderDetailRequest req)
        {
            ApiResponse response = new ApiResponse();

            var pendingOrderDetail = await _db.OrderDetails.FirstOrDefaultAsync(
                p => p.Id == id &&
                    id == req.Id &&
                    p.OrderId == req.OrderId);

            if (pendingOrderDetail == null)
            {
                response.StatusCode = HttpStatusCode.NotFound;
                response.Messages = ["There is no pending Order Detail!"];
                return NotFound(response);
            }

            _db.OrderDetails.Remove(pendingOrderDetail);
            await _db.SaveChangesAsync();

            response.StatusCode = HttpStatusCode.OK;
            response.IsSuccess = true;
            response.Data = pendingOrderDetail;
            return Ok(response);
        }
        #endregion
    }
}
