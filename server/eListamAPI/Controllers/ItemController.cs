using Azure;
using eListamAPI.Data;
using eListamAPI.DTOs.Items;
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
    public class ItemController : ControllerBase
    {
        #region Fields
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        #endregion

        #region Constructor
        public ItemController(ApplicationDbContext db, IWebHostEnvironment env)
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
            var items = await _db.Items.Select(p => new ItemResponse()
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
                Data = items,
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

            var existingItem = await _db.Items.FirstOrDefaultAsync(p => p.Id == id);
            if (existingItem == null)
            {
                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.IsSuccess = false;
                apiResponse.Messages = ["Item Not Found!"];
                return NotFound(apiResponse);
            }

            var itemResponse = new ItemResponse()
            {
                Id = existingItem.Id,
                Name = existingItem.Name,
                Description = existingItem.Description,
                Price = existingItem.Price,
                Quantity = existingItem.Quantity,
                Image = existingItem.Image
            };

            apiResponse.StatusCode = HttpStatusCode.OK;
            apiResponse.IsSuccess = true;
            apiResponse.Data = itemResponse;
            return Ok(apiResponse);
        }
        #endregion

        #region CreateAsync
        [HttpPost]
        [ActionName(nameof(CreateAsync))]
        // Optional: Sets multipart/form-data fields in Scalar API
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateAsync([FromForm] ItemCreateRequest model)
        {
            ApiResponse apiResponse = new ApiResponse();
            if (ModelState.IsValid)
            {

                if (model.File == null || model.File.Length == 0)
                {
                    apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    apiResponse.IsSuccess = false;
                    apiResponse.Messages = ["Image is required!"];
                    return BadRequest(apiResponse);
                }

                // Combine wwwroot and images path --> wwwroot/images
                var folderPath = Path.Combine(_env.WebRootPath, "images");
                // Create images folder if it doesn't exists
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                // Combine images path and image filename
                var filePath = Path.Combine(folderPath, model.File.FileName);

                // Check if the file path exists
                if (System.IO.File.Exists(filePath))
                {
                    // Delete file path to create new one after
                    System.IO.File.Delete(filePath);
                }

                // Upload file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.File.CopyToAsync(stream);
                }

                // Create new Product
                Item stock = new Item()
                {
                    Name = model.Name,
                    Description = model.Description,
                    Price = model.Price,
                    Quantity = model.Quantity,
                    Image = "images/" + model.File.FileName,
                };

                await _db.Items.AddAsync(stock);
                await _db.SaveChangesAsync();
                apiResponse.StatusCode = HttpStatusCode.Created;
                apiResponse.IsSuccess = true;
                apiResponse.Data = model;
                return CreatedAtAction(nameof(GetByIdAsync), new { id = stock.Id }, apiResponse);
            }

            apiResponse.StatusCode = HttpStatusCode.BadRequest;
            apiResponse.IsSuccess = false;
            foreach (var value in ModelState.Values)
            {
                foreach (var error in value.Errors)
                {
                    apiResponse.Messages = [error.ErrorMessage];
                }
            }
            return BadRequest(apiResponse);
        }
        #endregion

        #region UpdateAsync
        [HttpPut("{id:int}")]
        [ActionName(nameof(UpdateAsync))]
        // Optional: Sets multipart/form-data fields in Scalar API
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateAsync(int id, [FromForm] ItemUpdateRequest model)
        {
            ApiResponse apiResponse = new ApiResponse();

            if (ModelState.IsValid)
            {
                // Find product by id
                var productFromDb = await _db.Items.FirstOrDefaultAsync(p => p.Id == id);
                if (productFromDb != null)
                {
                    productFromDb.Name = model.Name;
                    productFromDb.Description = model.Description;
                    productFromDb.Price = model.Price;
                    productFromDb.Quantity = model.Quantity;
                    productFromDb.Image = model.File!.FileName;

                    await _db.SaveChangesAsync();

                    apiResponse.StatusCode = HttpStatusCode.OK;
                    apiResponse.IsSuccess = true;
                    apiResponse.Data = productFromDb;
                    return Ok(apiResponse);
                }

                apiResponse.StatusCode = HttpStatusCode.NotFound;
                apiResponse.Messages = ["Item Not Found!"];
                return NotFound(apiResponse);
            }

            apiResponse.StatusCode = HttpStatusCode.BadRequest;
            apiResponse.IsSuccess = false;
            foreach (var value in ModelState.Values)
            {
                foreach (var error in value.Errors)
                {
                    apiResponse.Messages = [error.ErrorMessage];
                }
            }
            return BadRequest(apiResponse);
        }
        #endregion

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            ApiResponse apiResponse = new ApiResponse();
            
            var existingItem = await _db.Items.FirstOrDefaultAsync(p => p.Id == id);
            if (existingItem != null)
            {
                _db.Items.Remove(existingItem);
                await _db.SaveChangesAsync();

                apiResponse.StatusCode = HttpStatusCode.OK;
                apiResponse.IsSuccess = true;
                apiResponse.Data = existingItem;
                return Ok(apiResponse);
            }

            apiResponse.StatusCode = HttpStatusCode.NotFound;
            apiResponse.Messages = ["Item Not Found!"];
            return NotFound(apiResponse);
        }
        #endregion
    }
}
