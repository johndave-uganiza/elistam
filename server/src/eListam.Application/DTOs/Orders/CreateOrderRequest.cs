using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class CreateOrderRequest
    {
        public DateTime? Date { get; set; }
        public string UserId { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public decimal TotalQuantity { get; set; }
        public List<CreateOrderDetailRequest> OrderDetails { get; set; } = null!;
    }

    public class CreateOrderDetailRequest
    {
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
