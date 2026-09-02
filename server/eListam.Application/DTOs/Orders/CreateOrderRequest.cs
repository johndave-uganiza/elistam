using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class CreateOrderRequest
    {
        public DateTime? Date { get; set; }

        //[Required]
        //public string UserId { get; set; } = string.Empty;
        public CreateOrderDetailRequest OrderDetail { get; set; } = null!;
    }
}
