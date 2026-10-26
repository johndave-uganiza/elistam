using Microsoft.AspNetCore.Mvc;
using System.Net;
using eListam.API.Common;
using Microsoft.AspNetCore.Authorization;
using eListam.Application.Services.Interfaces.Products;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class ProductController : ControllerBase
    {
        #region Fields
        private readonly IProductService _service;
        #endregion

        #region Constructor
        public ProductController(IProductService service)
        {
            _service = service;
        }
        #endregion

        #region GetAsync
        [AllowAnonymous]
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
    }
}
