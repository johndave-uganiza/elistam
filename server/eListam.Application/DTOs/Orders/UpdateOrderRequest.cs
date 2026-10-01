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
}
