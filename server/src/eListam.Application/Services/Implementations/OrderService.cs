using eListam.Application.DTOs.Orders;
using eListam.Application.DTOs.Transactions;
using eListam.Application.Services.Interfaces;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Application.Services.Interfaces.Items;
using eListam.Application.Services.Interfaces.Orders;
using eListam.Application.Services.Interfaces.Transactions;
using eListam.Domain.Constants;
using eListam.Domain.Models.Entities;

namespace eListam.Application.Services.Implementations
{
    public class OrderService : IOrderService
    {
        #region Fields
        private readonly IOrderRepository _orderRepository;
        private readonly IItemRepository _itemRepository;
        private readonly ITransactionService _transactionService;
        private readonly IAuthService _authService;
        private readonly IDocumentNumberGenerator _documentNumberGenerator;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

        #region Constructor
        public OrderService(IOrderRepository orderRepository,
            IItemRepository itemRepository,
            ITransactionService transactionService,
            IAuthService authService,
            IDocumentNumberGenerator documentNumberGenerator, IUnitOfWork unitOfWork)
        {
            _orderRepository = orderRepository;
            _itemRepository = itemRepository;
            _transactionService = transactionService;
            _authService = authService;
            _documentNumberGenerator = documentNumberGenerator;
            _unitOfWork = unitOfWork;
        }
        #endregion

        #region GetAsync
        public async Task<Result<GetOrderResponse>> GetAsync()
        {
            var result = new Result<GetOrderResponse>();

            var order = await _orderRepository.GetAsync();
            var data = order.LastOrDefault(o => !o.IsCompleted);

            if (data == null)
                return result.Success(message: "There is no pending order.");

            return result.Success(MapGetOrderResponse(data));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetOrderResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetOrderResponse>();

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return result.Success(message: "Order does not exist!");

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region CreateAsync
        public async Task<Result<GetOrderResponse>> CreateAsync(CreateOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            var firstOrderDetail = req.OrderDetails.First();
            var item = await _itemRepository.GetByIdAsync(firstOrderDetail.ItemId);

            if(item == null || item.Stock <= 0)
                return result.Failure(message: "Order does not exist!");

            var orderNumber = await _documentNumberGenerator
                .GenerateDocumentNumberAsync(DocumentType.Order);

            var order = new Order()
            {
                UserId = userId,
                TotalQuantity = firstOrderDetail.Quantity,
                TotalPrice = firstOrderDetail.Quantity * item.Price,
                OrderNumber = orderNumber,
                Date = req.Date ?? DateTime.UtcNow,
                IsCompleted = false,
                OrderDetails = new List<OrderDetail>()
                {
                    new OrderDetail()
                    {
                        ItemId = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Quantity = firstOrderDetail.Quantity,
                        Image = item.Image ?? string.Empty,
                    }
                 }
            };

            var createdOrder = await _orderRepository.CreateAsync(order);
            await _unitOfWork.SaveChangesAsync(); 
            return result.Success(MapGetOrderResponse(createdOrder));
        }
        #endregion

        #region AddOrderDetailAsync
        public async Task<Result<GetOrderResponse>> AddOrderDetailAsync(int orderId, CreateOrderDetailRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            var order = await _orderRepository.GetByIdAsync(orderId);

            if (order == null)
                return result.Failure(message: "Order does not exist!");

            var item = await _itemRepository.GetByIdAsync(req.ItemId);

            if (item == null)
                return result.Failure(message: "Item does not exist!");

            // Check whether this product is already in the order.
            var existingDetail = order.OrderDetails.FirstOrDefault(od => od.ItemId == item.Id);

            if (existingDetail != null)
            {
                existingDetail.Quantity += req.Quantity;
            }
            else
            {
                order.OrderDetails.Add(new OrderDetail
                {
                    ItemId = item.Id,
                    Quantity = req.Quantity,
                    Description = item.Description,
                    Image = item.Image ?? string.Empty,
                    Name = item.Name,
                    Price = item.Price
                });
            }

            // Recalculate totals using the actual order details.
            order.TotalPrice = order.OrderDetails.Sum(od => od.Price * od.Quantity);
            order.TotalQuantity = order.OrderDetails.Sum(od => od.Quantity);

            await _unitOfWork.SaveChangesAsync();

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region UpdateAsync
        public async Task<Result<GetOrderResponse>> UpdateAsync(int id, UpdateOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return result.Failure(message: "Order does not exist!");

            // Update existing Order Detail
            foreach (var detail in req.OrderDetails)
            {
                var existingDetail = order.OrderDetails.FirstOrDefault(od => od.Id == detail.Id);

                if (existingDetail != null)
                    existingDetail?.Quantity = detail.Quantity;
            }

            foreach(var detail in order.OrderDetails)
            {
                if (!req.OrderDetails.Any(od => od.Id == detail.Id))
                    order.OrderDetails.Remove(detail);
            }

            order.Date = req.Date ?? order.Date;
            order.TotalPrice = req.OrderDetails.Sum(o => o.Price * o.Quantity);
            order.TotalQuantity = req.OrderDetails.Sum(o => o.Quantity);

            _orderRepository.Update(order);
            await _unitOfWork.SaveChangesAsync();
            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region DeleteAsync
        public async Task<Result<GetOrderResponse>> DeleteAsync(int id)
        {
            var result = new Result<GetOrderResponse>();

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "User does not exist!");

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return result.Failure(message: "Order does not exist!");

            _orderRepository.Delete(order);
            await _unitOfWork.SaveChangesAsync();

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region ConfirmOrderAsync
        public async Task<Result<GetOrderResponse>> ConfirmOrderAsync(int id, ConfirmOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var userId = _authService.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return result.Failure(message: "Order does not exist!");

            var order = await _orderRepository.GetByIdAsync(id);

            if(order == null)
                return result.Failure(message: "Order does not exist!");

            if(order.IsCompleted)
                return result.Failure(message: "Order was already completed!");

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                order.UserId = userId;
                order.IsCompleted = true;
                order.PaymentMethod = req.PaymentMethod;

                var transaction = new CreateTransactionRequest()
                {
                    Date = DateTime.UtcNow,
                    IsCompleted = order.IsCompleted,
                    OrderId = order.Id,
                    OrderNumber = order.OrderNumber,
                    TotalPrice = order.TotalPrice,
                    TotalQuantity = order.TotalQuantity,
                    UserId = order.UserId,
                    PaymentMethod = order.PaymentMethod,
                    TransactionDetails = order.OrderDetails.Select(od =>
                    new CreateTransactionDetailRequest()
                    {
                        Description = od.Description,
                        Image = od.Image,
                        Name = od.Name,
                        Price = od.Price,
                        ItemId = od.ItemId,
                        Quantity = od.Quantity,
                    }).ToList()
                };

                foreach (var detail in transaction.TransactionDetails)
                {
                    var item = await _itemRepository.GetByIdAsync(detail.ItemId);
                    item?.Stock -= detail.Quantity;
                }

                await _transactionService.CreateAsync(transaction);
                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
            
            return result.Success(MapGetOrderResponse(order));
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
                    ItemId = od.ItemId,
                    Quantity = od.Quantity,
                }),
            };
        }
        #endregion  
    }
}
