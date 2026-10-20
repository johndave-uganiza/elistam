using eListam.Application.Services.Implementations;
using eListam.Application.Services.Interfaces.Items;
using eListam.Domain.Models.Entities;
using Moq;


namespace eListam.Application.Tests.Services.Implementations
{
    public class ProductServiceTests
    {
        #region Fields
        private readonly ProductService _productService;
        private readonly Mock<IItemRepository> _itemRepository;
        #endregion

        #region Constructor
        public ProductServiceTests()
        {
            _itemRepository = new Mock<IItemRepository>();
            _productService = new ProductService(_itemRepository.Object);
        }
        #endregion

        #region GetAsync_WhenItemsExist_ReturnsAllItemsWithPositiveStock
        [Fact]
        public async Task GetAsync_WhenItemsExist_ReturnsAllItemsWithPositiveStock()
        {
            // Arrange
            var items = new List<Item>()
            {
                new() {Id = 1, Name = "Item A", Stock = -1},
                new() {Id = 2, Name = "Item B", Stock = 1},
                new() {Id = 3, Name = "Item C", Stock = 0},
                new() {Id = 4, Name = "Item D", Stock = 2},
            };

            _itemRepository
                .Setup(x => x.GetAsync())
                .ReturnsAsync(items);

            // Act
            var result = await _productService.GetAsync();
            var data = result.Data;

            // Assert
            Assert.Equal(
                [2, 4],
                data?.Where(x => x.Stock > 0).OrderBy(x => x.ItemId).Select(x => x.ItemId));
        }
        #endregion

        #region GetByIdAsync_WhenItemDoesNotExists_ReturnsProductNotExistsMessage
        [Fact]
        public async Task GetByIdAsync_WhenItemDoesNotExists_ReturnNotExistsMessage()
        {
            // Arrange
            int itemId = 999999999;

            _itemRepository.Setup(x => x.GetByIdAsync(itemId)).ReturnsAsync((Item?)null);

            // Act
            var result = await _productService.GetByIdAsync(itemId);
            var message = result.Message;

            // Assert
            Assert.Equal("Product does not exist!", message);
        }
        #endregion
    }
}
