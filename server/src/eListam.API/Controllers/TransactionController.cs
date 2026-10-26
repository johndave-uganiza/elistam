using eListam.Application.Services.Interfaces.Transactions;
using Microsoft.AspNetCore.Mvc;

namespace eListamAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Use ControllerBase for Web Api controllers
    public class TransactionController : ControllerBase
    {
        #region Fields
        private readonly ITransactionService _service;
        #endregion

        #region Constructor
        public TransactionController(ITransactionService service)
        {
            _service = service;
        }
        #endregion

        #region GetAsync
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _service.GetAsync();
            return this.GetObjectResult(result);
        }
        #endregion

        #region GetByIdAsync
        [HttpGet("{id:int}")]
        // Mirror the CreatedAtAction Action Name
        [ActionName(nameof(GetByIdAsync))]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var result = await _service.GetByIdAsync(id);
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

        #region ExportCsvAsync
        [HttpGet("export")]
        [ActionName(nameof(ExportCsvAsync))]
        public async Task<IActionResult> ExportCsvAsync(int id)
        {
            var result = await _service.ExportCsvAsync();

            if (result.IsSuccess && result?.Data?.CsvData != null)
                return File(result.Data.CsvData, "text/csv", "transaction.csv");
            
            return this.GetObjectResult(result!);
        }
        #endregion

    }
}
