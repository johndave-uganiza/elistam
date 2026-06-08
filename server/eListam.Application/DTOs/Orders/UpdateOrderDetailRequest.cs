using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class UpdateOrderDetailRequest
    {
        [Required]
        public int OrderDetailId { get; set; }
        [Required]
        public int OrderId { get; set; }
        public double Quantity { get; set; }
    }
}
