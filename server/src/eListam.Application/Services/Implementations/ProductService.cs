using eListam.Application.DTOs.Products;
using eListam.Application.Services.Interfaces.Items;
using eListam.Application.Services.Interfaces.Products;
using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IItemRepository _itemRepository;

        #region Constructor
        public ProductService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetProductResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetProductResponse>>();

            var items = await _itemRepository.GetAsync();
            var products = items
                .Where(o => o.Stock > 0)
                .OrderByDescending(o => o.Id);

            return result.Success(products.Select(MapGetProductResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetProductResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetProductResponse>();

            var item = await _itemRepository.GetByIdAsync(id);

            if (item == null)
                return result.Success(message: "Product does not exist!");

            return result.Success(MapGetProductResponse(item));
        }
        #endregion

        #region Mappers

        #region MapGetProductResponse
        private GetProductResponse MapGetProductResponse(Item item)
        {
            return new GetProductResponse()
            {
                ItemId = item.Id,
                Name = item.Name,
                Description = item.Description,
                Image = item.Image ?? "",
                Price = item.Price,
                Stock = item.Stock,
            };
        }
        #endregion

        #endregion
    }
}
