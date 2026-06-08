using eListam.Application.Common;
using eListam.Application.DTOs.Items;

namespace eListam.Application.Services.Interface
{
    public interface IItemService
    {
        public Task<Result<IEnumerable<GetItemResponse>>> GetAsync();
        public Task<Result<GetItemResponse>> GetByIdAsync(int id);
        public Task<Result<GetItemResponse>> CreateAsync(CreateItemRequest req);
        public Task<Result<GetItemResponse>> UpdateAsync(int id, UpdateItemRequest req);
        public Task<Result<GetItemResponse>> DeleteAsync(int id);
    }
}
