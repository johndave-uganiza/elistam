using eListamAPI.Data;
using eListamAPI.DTOs;
using eListamAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace eListamAPI.Services
{
    public class ApplicationDbSeeder
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _env;
        private readonly HttpClient _httpClient;
        private readonly ILogger<ApplicationDbSeeder> _logger;

        public ApplicationDbSeeder(
            ApplicationDbContext db, 
            IHttpClientFactory client, 
            IWebHostEnvironment env,
            ILogger<ApplicationDbSeeder> logger
        )
        {
            _db = db;
            _httpClient = client.CreateClient();
            _env = env;
            _logger = logger;
        }
        public async Task Seed()
        {
            if (_db.Items.Any())
                return;

            var getProducts = await GetProducts();
            var productList = new List<Item>();

            foreach (var product in getProducts)
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

            // Check if the directory exists, if not create it
            var directoryPath = Path.Combine(_env.WebRootPath, "images");
            if(!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            // Download and save the product images to the wwwroot/images directory
            // Iterate the product list
            foreach(var product in getProducts)
            {
                // Get the image url from the product
                var imageUrl = product.ThumbNail;
                // Get the file name from the image url
                var fileName = Path.GetFileName(imageUrl);
                // Get the file path
                var filePath = Path.Combine(directoryPath, fileName);
                // Check if the file already exists, if not download and save it
                if (!File.Exists(filePath))
                {
                    try
                    {
                        // Download the image as byte array
                        var imageBytes = await _httpClient.GetByteArrayAsync(imageUrl);
                        // Save the image to the file path
                        await File.WriteAllBytesAsync(filePath, imageBytes);
                    }
                    catch (Exception ex) 
                    {
                        var errorMessage = $"Failed to download the image from {imageUrl}";
                        _logger.LogError(ex, errorMessage);
                        throw;
                    }
                }
            }

            await _db.SaveChangesAsync();
        }

        #region Helpers
        private async Task<List<DummyProductResponse>> GetProducts()
        {
            var productList = new List<DummyProductResponse>();
            var request = await _httpClient.GetAsync("https://dummyjson.com/products");

            if (request.IsSuccessStatusCode)
            {
                // Read request content as string
                var json = await request.Content.ReadAsStringAsync();

                // Deserialize json string to JsonElement
                var jsonElement = JsonSerializer.Deserialize<JsonElement>(json);

                // Get the product list and convert to string
                var products = jsonElement.GetProperty("products").GetRawText();

                // Set json properties as case insensitive
                var options = new JsonSerializerOptions()
                {
                    PropertyNameCaseInsensitive = true,
                };

                // Deserialize json from string to Product Response DTO
                productList = JsonSerializer.Deserialize<List<DummyProductResponse>>(products, options);
            }

            return productList!;
        }
        #endregion
    }
}