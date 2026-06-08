using eListam.Application.Common;
using eListam.Application.DTOs.Items;
using eListam.Application.Interfaces;
using eListam.Application.Services.Interface;
using eListam.Domain.Models;

namespace eListam.Application.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _repo;
        private readonly IFileStorage _storage;

        #region Constructor
        public ItemService(IItemRepository repo, IFileStorage storage)
        {
            _repo = repo;
            _storage = storage;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetItemResponse>>> GetAsync()
        {
            var items = await _repo.GetAsync();

            return new Result<IEnumerable<GetItemResponse>>()
            {
                IsSuccess = true,
                Data = items.Select(p => new GetItemResponse()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Image = p.Image,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    UserId = p.UserId,
                })
            };
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetItemResponse>> GetByIdAsync(int id)
        {
            var item = await _repo.GetByIdAsync(id);

            if (item == null)
            {
                return new Result<GetItemResponse>() 
                { 
                    IsSuccess = true,
                    Message = $"{nameof(Item)} does not exist!" 
                };
            }

            return new Result<GetItemResponse>()
            {
                IsSuccess = true,
                Data = new GetItemResponse()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Image = item.Image,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    UserId = item.UserId,
                }
            };
        }
        #endregion

        #region CreateAsync
        public async Task<Result<GetItemResponse>> CreateAsync(CreateItemRequest req)
        {
            if (req.File != null)
            {
                await _storage.SaveImageAsync(req.File);
            }

            var item = await _repo.CreateAsync(new Item()
            {
                Name = req.Name,
                Description = req.Description,
                Price = req.Price,
                Quantity = req.Quantity,
                Image = req.File?.Name,
                UserId = req.UserId,
            });

            return new Result<GetItemResponse>()
            {
                IsSuccess = true,
                Data = new GetItemResponse()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    Image = item.Image,
                    UserId = item.UserId,
                }
            };
        }
        #endregion

        #region UpdateAsync
        public async Task<Result<GetItemResponse>> UpdateAsync(int id, UpdateItemRequest req)
        {
            var item = await _repo.GetByIdAsync(id);

            if (item == null)
            {
                return new Result<GetItemResponse>()
                {
                    IsSuccess = true,
                    Message = $"{nameof(Item)} does not exist!"
                };
            }

            item.Name = req.Name;
            item.Description = req.Description;
            item.Price = req.Price;
            item.Quantity = req.Quantity;
            item.Image = req.File?.FileName;

            var result = await _repo.SaveChangesAsync();

            if (result <= 0)
            {
                return new Result<GetItemResponse>()
                {
                    IsSuccess = false,
                    Message = $"Failed to update {nameof(Item)}!"
                };
            }

            return new Result<GetItemResponse>()
            {
                IsSuccess = true,
                Data = new GetItemResponse()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    Image = item.Image,
                    UserId = item.UserId,
                }
            };
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetItemResponse>> DeleteAsync(int id)
        {
            var item = await _repo.GetByIdAsync(id);

            if (item == null)
            {
                return new Result<GetItemResponse>()
                {
                    IsSuccess = false,
                    Message = $"{nameof(Item)} does not exist!"
                };
            }

            var result = await _repo.DeleteAsync(item);

            if (result <= 0)
            {
                return new Result<GetItemResponse>()
                {
                    IsSuccess = false,
                    Message = $"Failed to delete {nameof(Item)}!"
                };
            }

            return new Result<GetItemResponse>()
            {
                IsSuccess = true,
                Data = new GetItemResponse()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    Image = item.Image,
                    UserId = item.UserId,
                }
            };
        }
        #endregion
    }
}
