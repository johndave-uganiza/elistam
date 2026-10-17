using eListam.Infrastructure.Persistence.Seeders.SeedData;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace eListam.Infrastructure.Integrations.DummyApi.Interface
{
    public interface IDummyProductExternalService
    {
        public Task<List<DummyProduct>> GetProductsAsync();
        public Task<byte[]> DownloadProductImageAsync(string imageUrl);
    }
}
