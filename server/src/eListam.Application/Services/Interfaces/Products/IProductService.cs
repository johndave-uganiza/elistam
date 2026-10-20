using eListam.Application.DTOs.Products;

namespace eListam.Application.Services.Interfaces.Products
{
    public interface IProductService
    {
        public Task<Result<IEnumerable<GetProductResponse>>> GetAsync();
        public Task<Result<GetProductResponse>> GetByIdAsync(int id);
    }
}
