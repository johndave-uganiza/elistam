using eListam.Application.Common;
using eListam.Application.DTOs.Orders;
using eListam.Application.Services.Abstractions.Auth;
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
        private readonly IAuthService _authService;
        private readonly string _userId;

        #region Constructor
        public OrderService(IOrderRepository orderRepo,
            IItemRepository itemRepo,
            ITransactionRepository transactionRepo,
            IAuthService authService)
        {
            _orderRepo = orderRepo;
            _itemRepo = itemRepo;
            _transactionRepo = transactionRepo;
            _authService = authService;
            _userId = _authService.GetUserId() ?? string.Empty;
        }
        #endregion

        #region GetAsync
        public async Task<Result<GetOrderResponse>> GetAsync()
        {
            var result = new Result<GetOrderResponse>();
           
            var order = (await _orderRepo.GetAsync()).FirstOrDefault(o => !o.IsCompleted);

            if (order == null)
                return result.Success($"There is no pending order.");

            return result.Success(MapGetOrderResponse(order));
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
            var _userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(_userId))
                return result.Failure($"User does not exist!");
            
            var item = await _itemRepo.GetByIdAsync(req.OrderDetail.ProductId);

            if(item == null || item.Quantity <= 0)
                return result.Failure($"{nameof(Order)} does not exist!");
            
            var orders = await _orderRepo.GetAsync();
            var existingOrder = orders.FirstOrDefault(o => !o.IsCompleted);

            // Create new order if an order doesn't exist
            if (existingOrder == null)
            {
                // Create new Order
                var order = await _orderRepo.CreateAsync(MapOrder(item, req));
                return result.Success(MapGetOrderResponse(order), $"New Order created successfully!");
            }

            existingOrder.UserId = _userId;
            existingOrder.TotalPrice += (item.Price * req.OrderDetail.Quantity);
            existingOrder.TotalQuantity += req.OrderDetail.Quantity;

            // Add order detail for an existing order
            existingOrder.OrderDetails.Add(new OrderDetail()
            {
                //OrderId = existingOrder.Id,
                Quantity = req.OrderDetail.Quantity,
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
            var _userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(_userId))
                return result.Failure($"User does not exist!");

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");
            
            
            // Update existing Order Detail
            foreach(var detail in req.OrderDetails)
            {
                var existingDetail = order.OrderDetails.FirstOrDefault(od => od.Id == detail.Id);

                if (existingDetail != null)
                    existingDetail.Quantity = detail.Quantity;
                
            }

            foreach(var detail in order.OrderDetails)
            {
                if (!req.OrderDetails.Any(od => od.Id == detail.Id))
                    order.OrderDetails.Remove(detail);
                
            }

            order.Date = req.Date ?? order.Date;
            order.TotalPrice = req.OrderDetails.Sum(o => o.Price * o.Quantity);

            await _orderRepo.SaveChangesAsync();
            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetOrderResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetOrderResponse>();
            var _userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(_userId))
                return result.Failure($"User does not exist!");

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

            await _orderRepo.DeleteAsync(order);

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region ConfirmOrderAsync
        public async Task<Result<GetOrderResponse>> ConfirmOrderAsync(int id)
        {
            var result = new Result<GetOrderResponse>();
            var _userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(_userId))
                return result.Failure($"User does not exist!");

            var order = await _orderRepo.GetByIdAsync(id);

            if(order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

            if(order.IsCompleted)
                return result.Failure($"{nameof(Order)} was already completed!");

            order.UserId = _userId;
            order.Date = DateTime.UtcNow;
            order.IsCompleted = true;
            var transactionNumber = await _transactionRepo.GenerateTransactionNumberAsync();

            await _transactionRepo.CreateAsync(MapTransaction(order, transactionNumber));

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region Mappers

        #region MapOrder
        private Order MapOrder(Item item, CreateOrderRequest req)
        {
            return new Order()
            {
                UserId = _userId,
                TotalQuantity = req.OrderDetail.Quantity,
                TotalPrice = req.OrderDetail.Price,
                OrderNumber = Guid.NewGuid().ToString(),
                Date = req.Date ?? DateTime.UtcNow,
                IsCompleted = false,
                OrderDetails = [new OrderDetail()
                    {
                        ItemId = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Quantity = req.OrderDetail.Quantity,
                        Image = item.Image ?? string.Empty,
                    }]
            };
        }
        #endregion

        #region MapTransaction
        private Transaction MapTransaction(Order order, string transactionNumber)
        {
            
            return new Transaction()
            {
                TransactionNumber = transactionNumber,
                Date = order.Date,
                IsCompleted = order.IsCompleted,
                OrderId = order.Id,
                OrderNumber = order.OrderNumber,
                TotalPrice = order.TotalPrice,
                TotalQuantity = order.TotalQuantity,
                UserId = order.UserId,
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
                IsCompleted = order.IsCompleted,
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
                    Id = od.Id,
                    Price = od.Price,
                    ProductId = od.ItemId,
                    Quantity = od.Quantity,
                }),
            };
        }
        #endregion

        #endregion
    }
}
