using eListam.Data.Seeder.SeedData;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace eListam.Infrastructure.ExternalServices
{
    public interface IDummyProductExternalService
    {
        public Task<List<DummyProduct>> GetProductsAsync();
        public Task<byte[]> DownloadProductImageAsync(string imageUrl);
    }
}
