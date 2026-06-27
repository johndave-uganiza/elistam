using eListam.Application.Common;
using eListam.Application.DTOs.Orders;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Abstractions.Orders;
using eListam.Application.Services.Abstractions.Transactions;
using eListam.Domain.Models;

namespace eListam.Application.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IItemRepository _itemRepo;
        private readonly ITransactionRepository _transactionRepo;

        #region Constructor
        public OrderService(IOrderRepository orderRepo,
            IItemRepository itemRepo,
            ITransactionRepository transactionRepo)
        {
            _orderRepo = orderRepo;
            _itemRepo = itemRepo;
            _transactionRepo = transactionRepo;
        }
        #endregion

        #region GetAsync
        public async Task<Result<IEnumerable<GetOrderResponse>>> GetAsync()
        {
            var result = new Result<IEnumerable<GetOrderResponse>>();

            var orders = await _orderRepo.GetAsync();

            return result.Success(orders.Select(MapGetOrderResponse));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetOrderResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetOrderResponse>();

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region CreateAsync
        public async Task<Result<GetOrderResponse>> CreateAsync(CreateOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var item = await _itemRepo.GetByIdAsync(req.OrderDetail.ProductId);

            if(item == null || item.Quantity <= 0)
                return result.Failure($"{nameof(Order)} does not exist!");

            var orders = await _orderRepo.GetAsync();

            var existingOrder = orders.FirstOrDefault(o => o.IsCompleted == true);

            // Create new order if an order doesn't exist
            if (existingOrder == null)
            {
                // Create new Order
                var order = await _orderRepo.CreateAsync(MapOrder(item, req));
                return result.Failure($"Pending order does not exist!");
            }

            existingOrder.UserId = req.UserId;

            // Add order detail for an existing order
            existingOrder.OrderDetails.Add(new OrderDetail()
            {
                Quantity = item.Quantity,
                Description = item.Description,
                Image = item.Image ?? string.Empty,
                Name = item.Name,
                Price = item.Price,
                ItemId = item.Id
            });

            await _orderRepo.SaveChangesAsync();
            return result.Success(MapGetOrderResponse(existingOrder));
        }
        #endregion

        #region UpdateAsync
        public async Task<Result<GetOrderResponse>> UpdateAsync(int id, UpdateOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");
            
            
            // Add or Update existing Order Details
            foreach(var detail in req.OrderDetails)
            {
                var existingDetail = order.OrderDetails.FirstOrDefault(od => od.Id == detail.Id);

                if (existingDetail == null)
                {
                    order.OrderDetails.Add(new OrderDetail
                    {
                        Description = detail.Description,
                        Image = detail.Image,
                        ItemId = detail.ProductId,
                        Price = detail.Price,
                        Quantity = detail.Quantity,
                        Name = detail.Name,
                    });
                }
                else
                {
                    existingDetail.Quantity = detail.Quantity;
                }
            }

            // Remove deleted details
            foreach (var existingDetail in order.OrderDetails)
            {
                if(!req.OrderDetails.Any(od => od.Id == existingDetail.Id))
                {
                    order.OrderDetails.Remove(existingDetail);
                }
            }

            order.Date = req.Date ?? order.Date;

            await _orderRepo.SaveChangesAsync();
            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetOrderResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetOrderResponse>();

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

            await _orderRepo.DeleteAsync(order);

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region PlaceOrderAsync
        public async Task<Result<GetOrderResponse>> PlaceOrderAsync(int id, PlaceOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();
            var order = await _orderRepo.GetByIdAsync(id);

            if(order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

            if(order.IsCompleted)
                return result.Failure($"{nameof(Order)} was already posted!");
            
            order.UserId = req.UserId;
            order.IsCompleted = true;

            await _transactionRepo.CreateAsync(MapTransaction(order, req.UserId));

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region Mappers

        #region MapOrder
        private Order MapOrder(Item item, CreateOrderRequest req)
        {
            return new Order()
            {
                UserId = req.UserId,
                TotalQuantity = 0,
                OrderNumber = Guid.NewGuid().ToString(),
                Date = req.Date ?? DateTime.Now,
                IsCompleted = false,
                OrderDetails = [new OrderDetail()
                    {
                        ItemId = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Quantity = item.Quantity,
                        Image = item.Image ?? string.Empty,
                    }]
            };
        }
        #endregion

        #region MapTransaction
        private Transaction MapTransaction(Order order, string userId)
        {
            return new Transaction()
            {
                Date = order.Date,
                IsPosted = order.IsCompleted,
                OrderId = order.Id,
                OrderNumber = order.OrderNumber,
                TotalPrice = order.TotalPrice,
                TotalQuantity = order.TotalQuantity,
                UserId = userId,
                TransactionDetails = order.OrderDetails.Select(od =>
                new TransactionDetail()
                {
                    Description = od.Description,
                    Image = od.Image,
                    Name = od.Name,
                    Price = od.Price,
                    ItemId = od.ItemId,
                    Quantity = od.Quantity,
                }).ToList()
            };
        }
        #endregion

        #region MapGetOrderResponse
        private GetOrderResponse MapGetOrderResponse(Order order)
        {
            return new GetOrderResponse()
            {
                Id = order.Id,
                IsPosted = order.IsCompleted,
                OrderNumber = order.OrderNumber,
                TotalQuantity = order.TotalQuantity,
                UserId = order.UserId,
                Date = order.Date,
                TotalPrice = order.TotalPrice,
                OrderDetails = order.OrderDetails.Select(od =>
                new GetOrderDetailResponse()
                {
                    Description = od.Description,
                    Image = od.Image,
                    Name = od.Name,
                    OrderDetailId = od.Id,
                    Price = od.Price,
                    ProductId = od.ItemId,
                    Quantity = od.Quantity,
                }),
            };
        }
        #endregion

        #endregion

        // NOTES:
        // Do not return existingOrder directly.
        // Map it to avoid circular reference issues when using .Include()
    }
}
