using eListam.Application.DTOs.Items;
using eListam.Application.Services.Interfaces;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Application.Services.Interfaces.Items;
using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Implementations
{
    public class ItemService : IItemService
    {
        #region Fields
        private readonly IItemRepository _itemRepository;
        private readonly IFileStorage _fileStorage;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        #endregion

        #region Constructor
        public ItemService(
            IItemRepository itemRepository,
            IFileStorage fileStorage,
            IUnitOfWork unitOfWork,
            IAuthService authService)
        {
            _itemRepository = itemRepository;
            _fileStorage = fileStorage;
            _unitOfWork = unitOfWork;
            _authService = authService;
            _authService = authService;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetItemResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetItemResponse>>();

            var items = await _itemRepository.GetAsync();
            var data = items.OrderByDescending(o => o.Id);

            return result.Success(data.Select(MapGetItemResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetItemResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetItemResponse>();

            var item = await _itemRepository.GetByIdAsync(id);

            if (item == null)
                return result.Success(message: "Item does not exist!");

            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region CreateAsync
        public async Task<Result<GetItemResponse>> CreateAsync(CreateItemRequest req)
        {
            var result = new Result<GetItemResponse>();
            string? imagePath = null;

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            if (req.ImageFile != null)
                imagePath = await _fileStorage.SaveImageAsync(req.ImageFile);
            
            var item = await _itemRepository.CreateAsync(MapItem(req, imagePath));

            await _unitOfWork.SaveChangesAsync();

            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region UpdateAsync
        public async Task<Result<GetItemResponse>> UpdateAsync(int id, UpdateItemRequest req)
        {
            var result = new Result<GetItemResponse>();
            string? imagePath = null;

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            var item = await _itemRepository.GetByIdAsync(id);

            if (item == null)
                return result.Success(message: "Item does not exist!");
            
            item.Name = req.Name;
            item.Description = req.Description;
            item.Cost = req.Cost;
            item.Price = req.Price;
            item.Stock = req.Stock;
            item.ExpirationDate = req.ExpirationDate;

            if (req.ImageFile != null)
                imagePath = await _fileStorage.SaveImageAsync(req.ImageFile);

            item.Image = imagePath ?? item.Image;

            await _unitOfWork.SaveChangesAsync();
            
            return result.Success(MapGetItemResponse(item));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetItemResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetItemResponse>();

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            var item = await _itemRepository.GetByIdAsync(id);

            if (item == null)
                return result.Success(message: "Item does not exist!");

            _itemRepository.Delete(item);
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
