using eListam.Application.DTOs.Items;
using eListam.Application.Services.Interfaces.Items;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eListamAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            return this.GetObjectResult(result);
        }
        #endregion

        #region GetByIdAsync
        [HttpGet("{id:int}")]
        [ActionName(nameof(GetByIdAsync))]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return this.GetObjectResult(result);
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
            return this.GetObjectResult(result);
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
            return this.GetObjectResult(result);
        }
        #endregion

        #region DeleteAsync
        [HttpDelete("{id:int}")]
        [ActionName(nameof(DeleteAsync))]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _service.DeleteAsync(id);
            return this.GetObjectResult(result);
        }
        #endregion
    }
}
