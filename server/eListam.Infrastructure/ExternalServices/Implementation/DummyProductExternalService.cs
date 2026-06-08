using eListam.Data.Seeder.SeedData;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace eListam.Infrastructure.ExternalServices.Implementation
{
    public class DummyProductExternalService : IDummyProductExternalService
    {
        private readonly HttpClient _httpClient;

        public DummyProductExternalService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        #region GetProductsAsync
        public async Task<List<DummyProduct>> GetProductsAsync()
        {
            var productList = new List<DummyProduct>();
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
                productList = JsonSerializer.Deserialize<List<DummyProduct>>(products, options);
            }

            return productList!;
        }
        #endregion

        #region DownloadProductImageAsync
        public async Task<byte[]> DownloadProductImageAsync(string imageUrl)
        {
            return await _httpClient.GetByteArrayAsync(imageUrl);
        }

        #endregion
    }
}
