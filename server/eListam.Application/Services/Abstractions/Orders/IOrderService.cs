using eListam.Application.Common;
using eListam.Application.DTOs.Orders;

namespace eListam.Application.Services.Abstractions.Orders
{
    public interface IOrderService
    {
        public Task<Result<GetOrderResponse>> GetAsync();
        public Task<Result<GetOrderResponse>> GetByIdAsync(int id);
        public Task<Result<GetOrderResponse>> CreateAsync(CreateOrderRequest req);
        public Task<Result<GetOrderResponse>> AddOrderDetailAsync(int orderId, CreateOrderDetailRequest req);
        public Task<Result<GetOrderResponse>> UpdateAsync(int id, UpdateOrderRequest req);
        public Task<Result<GetOrderResponse>> DeleteAsync(int id);
        public Task<Result<GetOrderResponse>> ConfirmOrderAsync(int id, ConfirmOrderRequest req);
    }
}
