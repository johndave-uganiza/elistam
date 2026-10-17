using eListam.Application.Common.Interfaces;
using eListam.Application.DTOs.Items;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Implementations;
using eListam.Domain.Models;
using Microsoft.AspNetCore.Http;
using Moq;

namespace eListam.Application.Tests.Services.Implementations
{
    public class ItemServiceTests
    {
        #region Fields
        private readonly Mock<IItemRepository> _itemRepository;
        private readonly Mock<IFileStorage> _fileStorage;
        private readonly Mock<IUnitOfWork> _unitOfWork;
        private readonly ItemService _itemService;
        #endregion

        #region Constructor
        public ItemServiceTests()
        {
            _itemRepository = new Mock<IItemRepository>();
            _fileStorage = new Mock<IFileStorage>();
            _unitOfWork = new Mock<IUnitOfWork>();

            _itemService = new ItemService(_itemRepository.Object, _fileStorage.Object, _unitOfWork.Object);
        }
        #endregion

        #region GetAsync_WhenItemsExist_ReturnsItemsByDescendingOrder
        [Fact]
        public async Task GetAsync_WhenItemsExist_ReturnsItemsByDescendingOrder()
        {
            // Arrange
            var items = new List<Item>
            {
               
                new() {Id = 1, Name = "Item A"},
                new() {Id = 99, Name = "Item Y"},
                new() {Id = 3, Name = "Item C"},
                new() {Id = 100, Name = "Item Z"},
                new() {Id = 2, Name = "Item B"},
                new() {Id = 98, Name = "Item X"}
            };

            _itemRepository
                .Setup(x => x.GetAsync())
                .ReturnsAsync(items);

            // Act
            var result = await _itemService.GetAsync();
            var data = result.Data;

            // Assert
            Assert.Equal(
                [100, 99, 98, 3, 2, 1],
                data?.Select(x => x.Id));

            Assert.Equal(
                ["Item Z", "Item Y", "Item X", "Item C", "Item B", "Item A"],
                data?.Select(x => x.Name));
        }
        #endregion

        #region GetByIdAsync_WhenItemDoesNotExists_ReturnItemNotExistsMessage
        [Fact]
        public async Task GetByIdAsync_WhenItemDoesNotExists_ReturnItemNotExistsMessage()
        {
            // Arrange
            int itemId = 999999999;

            _itemRepository.Setup(x => x.GetByIdAsync(itemId)).ReturnsAsync((Item?)null);

            // Act
            var result = await _itemService.GetByIdAsync(itemId);
            var message = result.Message;

            // Assert
            Assert.Equal("Item does not exist!", message);
        }
        #endregion

        #region UpdateAsync_WhenImageIsNotUpdated_ReturnsExistingImage
        [Fact]
        public async Task UpdateAsync_WhenImageIsNotUpdated_ReturnsExistingImage()
        {
            // Arrange
            int itemId = 1;

            var item = new Item()
            {
                Id = itemId,
                Image = "existing-image.png",
            };

            var req = new UpdateItemRequest()
            {
                Id = itemId,
                ImageFile = null
            };

            _itemRepository
                .Setup(x => x.GetByIdAsync(itemId))
                .ReturnsAsync(item);


            // Act
            await _itemService.UpdateAsync(itemId, req);

            // Assert
            Assert.Equal(
                "existing-image.png",
                item.Image);

            _fileStorage.Verify(
                x => x.SaveImageAsync(It.IsAny<IFormFile>()),
                Times.Never);

            _unitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Once);
        }
        #endregion

        #region DeleteAsync_WhenItemExists_DeletesItem
        [Fact]
        public async Task DeleteAsync_WhenItemExists_DeletesItem()
        {
            // Arrange
            int itemId = 1;

            var item = new Item()
            {
                Id = itemId,
                Name = "Item A"
            };

            _itemRepository
                .Setup(x => x.GetByIdAsync(itemId))
                .ReturnsAsync(item);

            // Act
            await _itemService.DeleteAsync(itemId);

            // Assert
            _itemRepository
                .Verify(x => x.DeleteAsync(item),
                Times.Once);

            _unitOfWork
                .Verify(x => x.SaveChangesAsync(),
                Times.Once);
        }
        #endregion
    }
}
