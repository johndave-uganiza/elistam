using eListam.Application.Common;
using eListam.Application.DTOs.Orders;
using eListam.Application.Services.Implementations;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Application.Services.Interfaces.Common;
using eListam.Application.Services.Interfaces.Items;
using eListam.Application.Services.Interfaces.Orders;
using eListam.Application.Services.Interfaces.Transactions;
using eListam.Domain.Constants;
using eListam.Domain.Models.Entities;
using Moq;

namespace eListam.Application.Tests.Services.Implementations
{
    public class OrderServiceTests
    {
        #region Fields
        private readonly Mock<IOrderRepository> _orderRepository;
        private readonly Mock<IItemRepository> _itemRepository;
        private readonly Mock<ITransactionService> _transactionService;
        private readonly Mock<IAuthService> _authService;
        private readonly Mock<IDocumentNumberGenerator> _documentNumberGenerator;
        private readonly Mock<IUnitOfWork> _unitOfWork;
        private readonly OrderService _orderService;
        #endregion

        #region Constructor
        public OrderServiceTests()
        {
            _orderRepository = new Mock<IOrderRepository>();
            _itemRepository = new Mock<IItemRepository>();
            _transactionService = new Mock<ITransactionService>();
            _authService = new Mock<IAuthService>();
            _documentNumberGenerator = new Mock<IDocumentNumberGenerator>();
            _unitOfWork = new Mock<IUnitOfWork>();

            _orderService = new OrderService(
                _orderRepository.Object,
                _itemRepository.Object,
                _transactionService.Object,
                _authService.Object,
                _documentNumberGenerator.Object,
                _unitOfWork.Object);
        }
        #endregion

        #region GetAsync_WhenOrdersExist_ReturnsLastIncompleteOrder
        [Fact]
        public async Task GetAsync_WhenOrdersExist_ReturnsLastIncompleteOrder()
        {
            // Arrange
            var orderNumbers = new string[] { "ORD-1", "ORD-2", "ORD-3" };
            var lastOrderNumber = orderNumbers.Last();

            var orders = new List<Order>();

            for (int i = 0; i < 3; i++)
            {
                var order = new Order()
                {
                    Id = i + 1,
                    OrderNumber = orderNumbers[i],
                    IsCompleted = false,
                    Date = DateTime.Now,
                    PaymentMethod = "Cash",
                    TotalPrice = 100,
                    TotalQuantity = 1,
                    UserId = "user-123",
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail()
                        {
                            Id = 1,
                            OrderId = i +1,
                            Name = "Item A",
                            ItemId = 1,
                            Description = "Item A Description",
                            Price = 100,
                            Quantity = 1,
                            Image = "item_a.png",
                        }
                    }
                };

                orders.Add(order);
            }

            _orderRepository
                .Setup(x => x.GetAsync())
                .ReturnsAsync(orders);

            // Act
            var result = await _orderService.GetAsync();
            var data = result.Data;

            // Assert
            Assert.Equal(
                lastOrderNumber,
                data?.OrderNumber);
        }
        #endregion

        #region GetByIdAsync_WhenOpenOrderDoesNotExist_ReturnsOrderNotExistsMessage
        [Fact]
        public async Task GetByIdAsync_WhenItemDoesNotExists_ReturnItemNotExistsMessage()
        {
            // Arrange
            int orderId = 999999999;

            _orderRepository
                .Setup(x => x.GetByIdAsync(orderId))
                .ReturnsAsync((Order?)null);

            // Act
            var result = await _orderService.GetByIdAsync(orderId);
            var message = result.Message;

            // Assert
            Assert.Equal(
                "Order does not exist!",
                message);
        }
        #endregion

        #region CreateAsync_WhenLastOpenOrderDoesNotExist_ReturnsCreatedOrderWithOneOrderDetail
        [Fact]
        public async Task CreateAsync_WhenLastOpenOrderDoesNotExist_ReturnsCreatedOrderWithOneOrderDetail()
        {
            // Arrange
            int itemId = 1;

            var item = new Item()
            {
                Id = itemId,
                Name = "Item A",
                Description = "Item A Description",
                Price = 100,
                Stock = 1,
                Image = "item_a.png",
            };

            var orderRequest = new CreateOrderRequest()
            {
                OrderDetails = new List<CreateOrderDetailRequest>()
                {
                    new CreateOrderDetailRequest()
                    {
                        ItemId = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Quantity = item.Stock,
                        Image = item.Image,
                    }
                 }
            };

            var firstOrderDetail = orderRequest.OrderDetails.First();

            var order = new Order()
            {
                TotalQuantity = firstOrderDetail.Quantity,
                TotalPrice = firstOrderDetail.Quantity * firstOrderDetail.Price,
                Date = DateTime.UtcNow,
                OrderDetails = new List<OrderDetail>()
                {
                    new OrderDetail()
                    {
                        ItemId = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Quantity = firstOrderDetail.Quantity,
                        Image = item.Image,
                    }
                 }
            };

            var user = new Result<string>
            {
                Data = "user-123"
            };

            _authService
                .Setup(x => x.GetUserId())
                .Returns(user);

            _itemRepository
                .Setup(x => x.GetByIdAsync(itemId))
                .ReturnsAsync(item);

            _documentNumberGenerator
                .Setup(x => x.GenerateDocumentNumberAsync(DocumentType.Order))
                .ReturnsAsync("ORD-1");

            _orderRepository
                .Setup(x => x.CreateAsync(It.IsAny<Order>()))
                .ReturnsAsync((Order order) =>
                {
                    order.Id = 1;
                    order.OrderDetails.First().Id = 1;
                    return order;
                });

            // Act
            var result = await _orderService.CreateAsync(orderRequest);
            var data = result.Data;

            // Assert
            Assert.True(
                data != null &&
                data.Id != 0 &&
                data.OrderDetails.First().Id != 0);

            Assert.Equal(
                1,
                data?.OrderDetails.Count());
        }
        #endregion

        #region AddOrderDetailAsync_WhenAddingExistingItemInOpenOrder_ReturnsOrderWithIncreasedQuantity
        [Fact]
        public async Task AddOrderDetailAsync_WhenAddingExistingItemInOpenOrder_ReturnsOrderWithIncreasedQuantity()
        {
            // Arrange
            int itemId1 = 1;
            int itemId2 = 2;
            int orderId = 1;
            int orderQuantity1 = 1;
            int orderQuantity2 = 2;
            int orderDetailRequestQuantity1 = 3;

            // Item
            var item1 = new Item()
            {
                Id = itemId1,
                Name = "Item A",
                Description = "Item A Description",
                Price = 100,
                Stock = 1,
                Image = "item_a.png",
            };

            var item2 = new Item()
            {
                Id = itemId2,
                Name = "Item B",
                Description = "Item B Description",
                Price = 200,
                Stock = 2,
                Image = "item_b.png",
            };

            // Order Detail Request
            var orderDetailRequest = new CreateOrderDetailRequest()
            {
                ItemId = itemId1,
                Name = item1.Name,
                Description = item1.Description,
                Price = item1.Price,
                Quantity = orderDetailRequestQuantity1,
                Image = item1.Image,
            };
            
            // Order
            var order = new Order()
            {
                Id = orderId,
                IsCompleted = false,
                OrderNumber = "ORD-1",
                PaymentMethod = "Cash",
                TotalQuantity = orderQuantity1 + orderQuantity2,
                TotalPrice = orderQuantity1 * item1.Price + orderQuantity2 * item2.Price,
                Date = DateTime.UtcNow,
                OrderDetails = new List<OrderDetail>()
                {
                    new OrderDetail()
                    {
                        ItemId = itemId1,
                        Name = item1.Name,
                        Description = item1.Description,
                        Price = item1.Price,
                        Quantity = orderQuantity1,
                        Image = item1.Image,
                    },
                    new OrderDetail()
                    {
                        ItemId = itemId2,
                        Name = item2.Name,
                        Description = item1.Description,
                        Price = item2.Price,
                        Quantity = orderQuantity2,
                        Image = item2.Image,
                    }
                 }
            };

            // User
            var user = new Result<string>
            {
                Data = "user-123"
            };

            _authService
                .Setup(x => x.GetUserId())
                .Returns(user);

            _orderRepository
               .Setup(x => x.GetByIdAsync(orderId))
               .ReturnsAsync(order);

            _itemRepository
                .Setup(x => x.GetByIdAsync(itemId1))
                .ReturnsAsync(item1);

            // Act
            var result = await _orderService.AddOrderDetailAsync(orderId, orderDetailRequest);
            var data = result.Data;

            // Assert
            Assert.Equal(
                orderQuantity1 + orderDetailRequestQuantity1,
                data?.OrderDetails.FirstOrDefault(x => x.ItemId == itemId1)?.Quantity);

            Assert.Equal(
                orderQuantity1 + orderQuantity2 + orderDetailRequestQuantity1,
                data?.TotalQuantity);
        }
        #endregion
    }
}
