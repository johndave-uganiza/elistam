using eListam.Application.Common;
using eListam.Application.DTOs.Products;
using eListam.Application.Services.Abstractions.Products;
using eListam.Domain.Models;

namespace eListam.Application.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;

        #region Constructor
        public ProductService(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetProductResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetProductResponse>>();

            var products = await _productRepo.GetAsync();

            return result.Success(products.Select(MapGetProductResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetProductResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetProductResponse>();

            var item = await _productRepo.GetByIdAsync(id);

            if (item == null)
                return result.Success("Product does not exist!");

            return result.Success(MapGetProductResponse(item));
        }
        #endregion

        #region Mappers

        #region MapGetProductResponse
        private GetProductResponse MapGetProductResponse(Item item)
        {
            return new GetProductResponse()
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Image = item.Image ?? "",
                Price = item.Price,
                Quantity = item.Quantity,
            };
        }
        #endregion

        #endregion
    }
}
