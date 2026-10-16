using eListam.Application.Common;
using eListam.Application.Common.Interfaces;
using eListam.Application.DTOs.Orders;
using eListam.Application.DTOs.Transactions;
using eListam.Application.Services.Abstractions.Auth;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Abstractions.Orders;
using eListam.Application.Services.Abstractions.Transactions;
using eListam.Domain.Constants;
using eListam.Domain.Models;

namespace eListam.Application.Services.Implementations
{
    public class OrderService : IOrderService
    {
        #region Fields
        private readonly IOrderRepository _orderRepository;
        private readonly IItemService _itemService;
        private readonly ITransactionService _transactionService;
        private readonly IAuthService _authService;
        private readonly IDocumentNumberGenerator _documentNumberGenerator;
        private readonly IUnitOfWork _unitOfWork;
        private readonly string _userId;
        #endregion

        #region Constructor
        public OrderService(IOrderRepository orderRepository,
            IItemService itemService,
            ITransactionService transactionService,
            IAuthService authService,
            IDocumentNumberGenerator documentNumberGenerator, IUnitOfWork unitOfWork)
        {
            _orderRepository = orderRepository;
            _itemService = itemService;
            _transactionService = transactionService;
            _authService = authService;
            _documentNumberGenerator = documentNumberGenerator;
            _unitOfWork = unitOfWork;
            _userId = _authService.GetUserId() ?? string.Empty;
        }
        #endregion

        #region GetAsync
        public async Task<Result<GetOrderResponse>> GetAsync()
        {
            var result = new Result<GetOrderResponse>();
           
            var order = (await _orderRepository.GetAsync()).FirstOrDefault(o => !o.IsCompleted);

            if (order == null)
                return result.Success($"There is no pending order.");

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region GetByIdAsync
        public async Task<Result<GetOrderResponse>> GetByIdAsync(int id)
        {
            var result = new Result<GetOrderResponse>();

            var order = await _orderRepository.GetByIdAsync(id);

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
            
            var item = (await _itemService.GetByIdAsync(req.OrderDetails.First().ItemId)).Data;

            if(item == null || item.Stock <= 0)
                return result.Failure($"Order does not exist!");

            var quantity = req.OrderDetails.First().Quantity;
            var price = req.OrderDetails.First().Price;
            var date = req.Date ?? DateTime.UtcNow;
            var orderNumber = await _documentNumberGenerator.GenerateDocumentNumberAsync(DocumentType.Order);

            var order = await _orderRepository.CreateAsync(new Order()
            {
                UserId = _userId,
                TotalQuantity = quantity,
                TotalPrice = quantity * price,
                OrderNumber = orderNumber,
                Date = date,
                IsCompleted = false,
                OrderDetails = [new OrderDetail()
                    {
                        ItemId = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Quantity = quantity,
                        Image = item.Image ?? string.Empty,
                    }]
            });

            await _unitOfWork.SaveChangesAsync();
               
            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region AddOrderDetailAsync
        public async Task<Result<GetOrderResponse>> AddOrderDetailAsync(int orderId, CreateOrderDetailRequest req)
        {
            var result = new Result<GetOrderResponse>();

            var userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(userId))
                return result.Failure("User does not exist!");

            var order = await _orderRepository.GetByIdAsync(orderId);

            if (order == null)
                return result.Failure("Order does not exist!");

            var item = (await _itemService.GetByIdAsync(req.ItemId)).Data;

            if (item == null)
                return result.Failure("Item does not exist!");

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
            var _userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(_userId))
                return result.Failure($"User does not exist!");

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

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

            await _unitOfWork.SaveChangesAsync();
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

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return result.Failure($"{nameof(Order)} does not exist!");

            await _orderRepository.DeleteAsync(order);
            await _unitOfWork.SaveChangesAsync();

            return result.Success(MapGetOrderResponse(order));
        }
        #endregion

        #region ConfirmOrderAsync
        public async Task<Result<GetOrderResponse>> ConfirmOrderAsync(int id, ConfirmOrderRequest req)
        {
            var result = new Result<GetOrderResponse>();
            var _userId = _authService.GetUserId();

            if (string.IsNullOrEmpty(_userId))
                return result.Failure($"User does not exist!");

            var order = await _orderRepository.GetByIdAsync(id);

            if(order == null)
                return result.Failure($"Order does not exist!");

            if(order.IsCompleted)
                return result.Failure($"Order was already completed!");

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                order.UserId = _userId;
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
                    var item = (await _itemService.GetByIdAsync(detail.ItemId)).Data;
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
