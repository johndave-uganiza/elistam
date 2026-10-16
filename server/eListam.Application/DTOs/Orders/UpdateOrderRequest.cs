using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class UpdateOrderRequest
    {
        [Required]
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public string UserId { get; set; } = string.Empty;
        public List<UpdateOrderDetailRequest> OrderDetails { get; set; } = [];
    }

    public class UpdateOrderDetailRequest
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
