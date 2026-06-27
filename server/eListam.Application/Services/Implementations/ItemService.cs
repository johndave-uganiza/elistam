using eListam.Application.Common;
using eListam.Application.DTOs.Items;
using eListam.Application.Services.Abstractions;
using eListam.Application.Services.Abstractions.Items;
using eListam.Domain.Models;

namespace eListam.Application.Services.Implementations
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepo;
        private readonly IFileStorage _storageRepo;

        #region Constructor
        public ItemService(IItemRepository itemRepo, IFileStorage storageRepo)
        {
            _itemRepo = itemRepo;
            _storageRepo = storageRepo;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetItemResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetItemResponse>>();

            var items = await _itemRepo.GetAsync();

            return result.Success(items.Select(MapGetItemResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetItemResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetItemResponse>();

            var item = await _itemRepo.GetByIdAsync(id);

            if (item == null)
                return result.Success($"{nameof(Item)} does not exist!");

            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region CreateAsync
        public async Task<Result<GetItemResponse>> CreateAsync(CreateItemRequest req)
        {
            var result = new Result<GetItemResponse>();

            if (req.File == null)
                return result.Failure("Image is required!");

            await _storageRepo.SaveImageAsync(req.File); 

            var item = await _itemRepo.CreateAsync(MapItem(req));

            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region UpdateAsync
        public async Task<Result<GetItemResponse>> UpdateAsync(int id, UpdateItemRequest req)
        {
            var result = new Result<GetItemResponse>();

            var item = await _itemRepo.GetByIdAsync(id);

            if (item == null)
                return result.Success($"{nameof(Item)} does not exist!");
            
            item.Name = req.Name;
            item.Description = req.Description;
            item.Price = req.Price;
            item.Quantity = req.Quantity;
            item.Image = req.File?.FileName;

            await _itemRepo.SaveChangesAsync();
            
            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetItemResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetItemResponse>();

            var item = await _itemRepo.GetByIdAsync(id);

            if (item == null)
                return result.Success($"{nameof(Item)} does not exist!");

            await _itemRepo.DeleteAsync(item);
            
            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region Mappers

        #region MapGetItemResponse
        private GetItemResponse MapGetItemResponse(Item item)
        {
            return new GetItemResponse()
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Image = item.Image,
                Price = item.Price,
                Quantity = item.Quantity,
                UserId = item.UserId,
            };
        }
        #endregion

        #region MapItem
        private Item MapItem(CreateItemRequest request)
        {
            return new Item()
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Quantity = request.Quantity,
                Image = request.File?.Name,
                UserId = request.UserId,
            };
        }
        #endregion

        #endregion
    }
}
