using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class PlaceOrderRequest
    {
        [Required]
        public int OrderId { get; set; }
        public bool IsPosted { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;

    }
}
