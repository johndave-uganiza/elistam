using eListam.Application.Common;
using eListam.Application.DTOs.Products;

namespace eListam.Application.Services.Abstractions.Products
{
    public interface IProductService
    {
        public Task<Result<IEnumerable<GetProductResponse>>> GetAsync();
        public Task<Result<GetProductResponse>> GetByIdAsync(int id);
    }
}
