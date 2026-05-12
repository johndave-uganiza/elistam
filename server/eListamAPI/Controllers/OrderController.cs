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
    public class OrderController : ControllerBase
    {
        #region Fields
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        #endregion

        #region Constructor
        public OrderController(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var existingOrders = await _db.Orders
            .Include(o => o.OrderDetails)
            .Where(o => !o.IsPosted)
            .ToListAsync();


            var getOrderResponse = existingOrders.Select(o => new GetOrderResponse()
            {
                Id = o.Id,
                OrderNumber = o.OrderNumber,
                TotalPrice = o.TotalPrice,
                TotalQuantity = o.TotalQuantity,
                UserId = o.UserId,
                OrderDetails = o.OrderDetails?.Select(od => new GetOrderDetailResponse()
                {
                    Description = od.Description,
                    Image = od.Image,
                    Name = od.Name,
                    OrderDetailId = od.Id,
                    Price = od.Price,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity
                })
            });

            ApiResponse apiResponse = new ApiResponse()
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
                Data = getOrderResponse,
            };

            return Ok(apiResponse);
        }
        #endregion

        #region GetByIdAsync
        [HttpGet("{id:int}")]
        // Mirror the CreatedAtAction Action Name
        [ActionName(nameof(GetByIdAsync))]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            ApiResponse apiResponse = new ApiResponse();

            if (id <= 0)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Invalid Product Id!"];
                return BadRequest();
            }

            var existingOrder = await _db.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(p => p.Id == id);
               
            if (existingOrder == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Product Not Found!"];
                return NotFound();
            }

            var getOrderResponse = new GetOrderResponse()
            {
                Id = existingOrder.Id,
                OrderNumber = existingOrder.OrderNumber,
                TotalPrice = existingOrder.TotalPrice,
                TotalQuantity = existingOrder.TotalQuantity,
                OrderDetails = existingOrder.OrderDetails?.Select(od => new GetOrderDetailResponse()
                {
                    Description = od.Description,
                    Image = od.Image,
                    Name = od.Name,
                    OrderDetailId = od.Id,
                    Price = od.Price,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity
                })
            };

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            apiResponse.Data = getOrderResponse;
            return Ok(apiResponse);
        }
        #endregion

        #region CreateAsync
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateOrderRequest req)
        {
            ApiResponse apiResponse = new ApiResponse();

            #region Validations
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

            var applicationUser = await _db.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == req.UserId);
            if (applicationUser == null)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["User does not exists!"];
                return BadRequest(apiResponse);
            }

            var existingProduct = await _db.Items
                .FirstOrDefaultAsync(p => p.Id == req.ProductId && p.Quantity > 0);

            if (existingProduct == null)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Product Not Found!"];
                return BadRequest(apiResponse);
            }
            #endregion

            var pendingOrder = await _db.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(p => !p.IsPosted);

            // Create new order if pending order doesn't exist
            if (pendingOrder == null)
            {
                // Create new Order
                Order order = new Order()
                {
                    OrderNumber = Guid.NewGuid().ToString(),
                    Date = req.Date ?? DateTime.UtcNow,
                    TotalPrice = existingProduct.Price * existingProduct.Quantity,
                    TotalQuantity = existingProduct.Quantity,
                    UserId = req.UserId,
                    IsPosted = false,
                    OrderDetails = [new OrderDetail()
                    {
                        ProductId = existingProduct.Id,
                        Name = existingProduct.Name,
                        Description = existingProduct.Description,
                        Price = existingProduct.Price,
                        Quantity = existingProduct.Quantity,
                        Image = existingProduct.Image
                    }]
                };

                await _db.Orders.AddAsync(order);
                await _db.SaveChangesAsync();

                apiResponse.StatusCode = HttpStatusCode.Created;
                apiResponse.IsSuccess = true;
                apiResponse.Data = new GetOrderResponse()
                {
                    Id = order.Id,
                    OrderNumber = order.OrderNumber,
                    Date = order.Date,
                    TotalPrice = order.TotalPrice,
                    TotalQuantity = order.TotalQuantity,
                    IsPosted = order.IsPosted,
                    UserId = order.UserId
                };
                return CreatedAtAction(nameof(GetByIdAsync), new { id = order.Id }, apiResponse);
            }

            // If user has changed, update UserId
            pendingOrder.UserId = req.UserId;
            
            // Add order detail for pending order
            var pendingOrderDetails = pendingOrder.OrderDetails;
            var newOrderDetail = new OrderDetail()
            {
                Quantity = existingProduct.Quantity,
                Description = existingProduct.Description,
                Image = existingProduct.Image,
                Name = existingProduct.Name,
                Price = existingProduct.Price,
                ProductId = existingProduct.Id
            };

            await _db.OrderDetails.AddAsync(newOrderDetail);
            await _db.SaveChangesAsync();

            apiResponse.StatusCode = HttpStatusCode.Created;
            apiResponse.IsSuccess= true;
            apiResponse.Data = new GetOrderResponse()
            {
                Id = pendingOrder.Id,
                OrderNumber = pendingOrder.OrderNumber,
                Date = pendingOrder.Date,
                TotalPrice = pendingOrder.TotalPrice,
                TotalQuantity = pendingOrder.TotalQuantity,
                IsPosted = pendingOrder.IsPosted,
                UserId = req.UserId,
                OrderDetails = pendingOrderDetails?.Select(od => new GetOrderDetailResponse()
                {
                    Quantity = od.Quantity,
                    Description = od.Description,
                    Image = od.Image,
                    Name = od.Name,
                    Price = od.Price,
                    ProductId = od.ProductId,
                    OrderDetailId = od.Id

                })
            };
            
            return Ok(apiResponse);
        }
        #endregion

        #region UpdateAsync
        [HttpPut("{id:int}")]
        [ActionName(nameof(UpdateAsync))]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] UpdateOrderRequest req)
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

            if (id != req.OrderId || id == 0)
            {
                apiResponse.StatusCode = HttpStatusCode.BadRequest;
                apiResponse.IsSuccess = false;
                return BadRequest(apiResponse);
            }

            var existingOrder = await _db.Orders
                .Include(e => e.OrderDetails)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (existingOrder == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                return NotFound(apiResponse);
            }

            existingOrder.Date = req.Date ?? existingOrder.Date;

            await _db.SaveChangesAsync();

            // Do not pass existingOrder directly to avoid circular reference issues when using .Include()
            apiResponse.Data = new GetOrderResponse()
            {
                Id = existingOrder.Id,
                OrderNumber = existingOrder.OrderNumber,
                Date = existingOrder.Date,
                TotalPrice = existingOrder.TotalPrice,
                TotalQuantity = existingOrder.TotalQuantity,
                IsPosted = existingOrder.IsPosted,
                OrderDetails = existingOrder.OrderDetails?.Select(ed => new GetOrderDetailResponse()
                {
                    Description = ed.Description,
                    Image = ed.Image,
                    Name = ed.Name,
                    OrderDetailId = ed.Id,
                    Price = ed.Price,
                    ProductId = ed.ProductId,
                    Quantity = ed.Quantity
                })
            };

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            return Ok(apiResponse);
        }
        #endregion

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            ApiResponse apiResponse = new ApiResponse();

            var pendingOrder = await _db.Orders.FirstOrDefaultAsync(p => p.Id == id);
            if (pendingOrder != null)
            {
                _db.Orders.Remove(pendingOrder);
                await _db.SaveChangesAsync();

                apiResponse.StatusCode = HttpStatusCode.OK;
                apiResponse.IsSuccess = true;
                apiResponse.Data = pendingOrder;
                return Ok(apiResponse);
            }

            apiResponse.StatusCode = HttpStatusCode.NotFound;
            apiResponse.Messages = ["There is no pending Order!"];
            return NotFound(apiResponse);
        }
        #endregion

        #region PlaceOrderAsync
        [HttpPost("{id:int}/Place")]
        public async Task<IActionResult> PlaceOrderAsync(int id, PlaceOrderRequest req)
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

            var existingOrder = await _db.Orders
                .Include(e => e.OrderDetails)
                .FirstOrDefaultAsync(o => o.Id == id && !o.IsPosted);

            if (existingOrder == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Order does not exists!"];
                return NotFound(apiResponse);
            }

            existingOrder.UserId = req.UserId;
            existingOrder.IsPosted = true;

            var existingOrderDetails = existingOrder.OrderDetails;

            var newTransaction = new Transaction()
            {
                Date = existingOrder.Date,
                IsPosted = existingOrder.IsPosted,
                OrderId = existingOrder.Id,
                OrderNumber = existingOrder.OrderNumber,
                TotalPrice = existingOrder.TotalPrice,
                TotalQuantity = existingOrder.TotalQuantity,
                UserId = req.UserId,
                TransactionDetails = existingOrderDetails?.Select(od => new TransactionDetail()
                {
                    Description = od.Description,
                    Image = od.Image,
                    Name = od.Name,
                    Price = od.Price,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                }).ToList()
            };

            await _db.Transactions.AddAsync(newTransaction);
            await _db.SaveChangesAsync();

            // Do not pass existingOrder directly to avoid circular reference issues when using .Include()
            apiResponse.Data = new GetOrderResponse()
            {
                Id = existingOrder.Id,
                OrderNumber = existingOrder.OrderNumber,
                Date = existingOrder.Date,
                TotalPrice = existingOrder.TotalPrice,
                TotalQuantity = existingOrder.TotalQuantity,
                IsPosted = existingOrder.IsPosted,
                UserId = existingOrder.UserId
            };

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            return Ok(apiResponse);
        }
        #endregion
    }
}
