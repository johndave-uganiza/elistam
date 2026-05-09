using Azure;
using eListamAPI.Data;
using eListamAPI.DTOs;
using eListamAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class ProductController : ControllerBase
    {
        #region Fields
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        #endregion

        #region Constructor
        public ProductController(ApplicationDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        [ActionName(nameof(GetAsync))]
        public async Task<IActionResult> GetAsync()
        {
            IEnumerable<Product> products = await _db.Items
            .Where(item => item.Quantity > 0)
            .Select(p => new Product()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Quantity = p.Quantity,
                Image = p.Image
            }).ToListAsync();

            ApiResponse apiResponse = new ApiResponse()
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
                Data = products,
            };

            return Ok(apiResponse);
        }
        #endregion

        #region GetByIdAsync
        [HttpGet("{id:int}")]
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

            IEnumerable<Product> productFromDb = await _db.Items
                .Where(p => p.Id == id)
                .Where(item => item.Quantity > 0)
                .Select(p => new Product()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Image = p.Image
                }).ToListAsync();

            if (productFromDb == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Product Not Found!"];
                return NotFound();
            }

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            apiResponse.Data = productFromDb;
            return Ok(apiResponse);
        }
        #endregion
    }
}
