using eListam.Application.Common;
using eListam.Application.DTOs.Orders;

namespace eListam.Application.Services.Abstractions.Orders
{
    public interface IOrderService
    {
        public Task<Result<IEnumerable<GetOrderResponse>>> GetAsync();
        public Task<Result<GetOrderResponse>> GetByIdAsync(int id);
        public Task<Result<GetOrderResponse>> CreateAsync(CreateOrderRequest req);
        public Task<Result<GetOrderResponse>> UpdateAsync(int id, UpdateOrderRequest req);
        public Task<Result<GetOrderResponse>> DeleteAsync(int id);
        public Task<Result<GetOrderResponse>> PlaceOrderAsync(int id, PlaceOrderRequest req);
    }
}
