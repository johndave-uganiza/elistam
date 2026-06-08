using eListam.Infrastructure.Persistence;
using eListam.Infrastructure.ExternalServices;
using eListam.Domain.Models;
using Microsoft.AspNetCore.Hosting;

namespace eListam.Infrastructure.Seeders
{
    public class DummyProductSeeder
    {
        private readonly ApplicationDbContext _db;
        private readonly IDummyProductExternalService _external;
        private readonly IWebHostEnvironment _env;
        public DummyProductSeeder
        (
            ApplicationDbContext db,
            IDummyProductExternalService external,
            IWebHostEnvironment env
        )
        {
            _db = db;
            _external = external;
            _env = env;
        }

        #region SeedAsync
        public async Task SeedAsync()
        {
            if (_db.Items.Any())
                return;

            var dummyProducts = await _external.GetProductsAsync();
            var webRootPath = _env.WebRootPath;

            // Check if the directory exists, if not create it
            if (!Directory.Exists(webRootPath))
            {
                Directory.CreateDirectory(webRootPath);
            }

            foreach (var product in dummyProducts)
            {
                _db.Items.Add(
                    new Item()
                    {
                        Name = product.Title,
                        Description = product.Description,
                        Price = product.Price,
                        Quantity = product.Stock,
                        Image = product.ThumbNail,
                    }
                );
            }

            // Download and save the product images to the wwwroot/images directory
            // Iterate the product list
            foreach (var product in dummyProducts)
            {
                // Get the image url from the product
                var imageUrl = product.ThumbNail;
                // Get the file name from the image url
                var fileName = Path.GetFileName(imageUrl);
                // Get the file path
                var filePath = Path.Combine(webRootPath, fileName);
                // Check if the file already exists, if not download and save it
                if (!File.Exists(filePath))
                {
                    try
                    {
                        // Download the image as byte array
                        var imageBytes = await _external.DownloadProductImageAsync(imageUrl);
                        // Save the image to the file path
                        await File.WriteAllBytesAsync(filePath, imageBytes);
                    }
                    catch (Exception)
                    {
                        var errorMessage = $"Failed to download the image from {imageUrl}";
                        //_logger.LogError(ex, errorMessage);
                        throw;
                    }
                }
            }

            await _db.SaveChangesAsync();
        }
        #endregion
    }
}