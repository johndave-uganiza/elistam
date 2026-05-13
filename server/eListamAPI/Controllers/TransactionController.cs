using Azure;
using eListamAPI.Data;
using eListamAPI.DTOs;
using eListamAPI.DTOs.Orders;
using eListamAPI.DTOs.Transactions;
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
    public class TransactionController : ControllerBase
    {
        #region Fields
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        #endregion

        #region Constructor
        public TransactionController(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var existingTransactions = await _db.Transactions
            .Include(o => o.TransactionDetails)
            .ToListAsync();


            var transactionResponse = existingTransactions.Select(t => new GetTransactionResponse()
            {
                Id = t.Id,
                OrderNumber = t.OrderNumber,
                TotalPrice = t.TotalPrice,
                TotalQuantity = t.TotalQuantity,
                TransactionDetails = t.TransactionDetails?.Select(td => new GetTransactionDetailResponse()
                {
                    Description = td.Description,
                    Id = td.Id,
                    Image = td.Image,
                    Name = td.Name,
                    Price = td.Price,
                    ProductId = td.ItemId,
                    Quantity  = td.Quantity,
                    TransactionId = td.TransactionId
                }).ToList()
            });

            ApiResponse apiResponse = new ApiResponse()
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
                Data = transactionResponse,
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

            var existingTransaction = await _db.Transactions
                .Include(t => t.TransactionDetails)
                .FirstOrDefaultAsync(p => p.Id == id);
               
            if (existingTransaction == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Transaction Not Found!"];
                return NotFound();
            }

            var transactionResponse = new GetTransactionResponse()
            {
                Id = existingTransaction.Id,
                OrderNumber = existingTransaction.OrderNumber,
                TotalPrice = existingTransaction.TotalPrice,
                TotalQuantity = existingTransaction.TotalQuantity,
                TransactionDetails = existingTransaction.TransactionDetails?.Select(td => new GetTransactionDetailResponse()
                {
                    Description = td.Description,
                    Id = td.Id,
                    Image = td.Image,
                    Name = td.Name,
                    Price = td.Price,
                    ProductId = td.ItemId,
                    Quantity = td.Quantity,
                    TransactionId = td.TransactionId
                })
            };

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            apiResponse.Data = transactionResponse;
            return Ok(apiResponse);
        }
        #endregion

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            ApiResponse response = new ApiResponse();

            var existingTransaction = await _db.Transactions.FirstOrDefaultAsync(p => p.Id == id);
            if (existingTransaction != null)
            {
                _db.Transactions.Remove(existingTransaction);
                await _db.SaveChangesAsync();

                response.StatusCode = HttpStatusCode.OK;
                response.IsSuccess = true;
                response.Data = existingTransaction;
                return Ok(response);
            }

            response.StatusCode = HttpStatusCode.NotFound;
            response.Messages = ["Transaction does not exist!"];
            return NotFound(response);
        }
        #endregion

    }
}
