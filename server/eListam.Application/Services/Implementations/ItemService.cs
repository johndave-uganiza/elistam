using eListam.Application.Common;
using eListam.Application.Common.Interfaces;
using eListam.Application.DTOs.Items;
using eListam.Application.Services.Abstractions.Items;
using eListam.Domain.Models;

namespace eListam.Application.Services.Implementations
{
    public class ItemService : IItemService
    {
        #region Fields
        private readonly IItemRepository _itemRepo;
        private readonly IFileStorage _storageRepo;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region Constructor
        public ItemService(IItemRepository itemRepo, IFileStorage storageRepo, IUnitOfWork unitOfWork)
        {
            _itemRepo = itemRepo;
            _storageRepo = storageRepo;
            _unitOfWork = unitOfWork;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetItemResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetItemResponse>>();

            var items = (await _itemRepo.GetAsync()).OrderByDescending(o => o.Id);

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
            string? imagePath = null;

            if (req.ImageFile != null)
                imagePath = await _storageRepo.SaveImageAsync(req.ImageFile);
            
            var item = await _itemRepo.CreateAsync(MapItem(req, imagePath));

            await _unitOfWork.SaveChangesAsync();

            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region UpdateAsync
        public async Task<Result<GetItemResponse>> UpdateAsync(int id, UpdateItemRequest req)
        {
            var result = new Result<GetItemResponse>();
            string? imagePath = null;

            var item = await _itemRepo.GetByIdAsync(id);

            if (item == null)
                return result.Success($"{nameof(Item)} does not exist!");
            
            item.Name = req.Name;
            item.Description = req.Description;
            item.Cost = req.Cost;
            item.Price = req.Price;
            item.Stock = req.Stock;
            item.ExpirationDate = req.ExpirationDate;

            if (req.ImageFile != null)
                imagePath = await _storageRepo.SaveImageAsync(req.ImageFile);

            item.Image = imagePath ?? item.Image;

            await _unitOfWork.SaveChangesAsync();
            
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
            await _unitOfWork.SaveChangesAsync();

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
                Cost = item.Cost,
                Stock = item.Stock,
                UserId = item.UserId,
                ExpirationDate = item.ExpirationDate
            };
        }
        #endregion

        #region MapItem
        private Item MapItem(CreateItemRequest request, string? imagePath)
        {
            return new Item()
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Cost= request.Cost,
                Stock = request.Stock,
                Image = imagePath,
                UserId = request.UserId,
                ExpirationDate = request.ExpirationDate
            };
        }
        #endregion

        #endregion
    }
}
