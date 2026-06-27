using eListam.API.Common;
using eListam.Application.DTOs.Items;
using eListam.Application.Services.Abstractions.Items;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class ItemController : ControllerBase
    {
        #region Fields
        private readonly IItemService _service;
        #endregion

        #region Constructor
        public ItemController(IItemService service)
        {
            _service = service;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        [ActionName(nameof(GetAsync))]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _service.GetAsync();

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
        [ActionName(nameof(CreateAsync))]
        // Optional: Sets multipart/form-data fields in Scalar API
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateAsync([FromForm] CreateItemRequest req)
        {
            var result = await _service.CreateAsync(req);
            if (!result.IsSuccess)
            {
                return BadRequest(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    IsSuccess = result.IsSuccess,
                    Messages = [result.Message]
                });
            }
           
            return CreatedAtAction(
                nameof(GetByIdAsync),
                new { id = result.Data?.Id },
                new ApiResponse()
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
        [ActionName(nameof(UpdateAsync))]
        // Optional: Sets multipart/form-data fields in Scalar API
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateAsync(int id, [FromForm] UpdateItemRequest req)
        {
            var result = await _service.UpdateAsync(id, req);
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

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _service.DeleteAsync(id);

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
    }
}
