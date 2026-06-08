
using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class UpdateOrderRequest
    {
        [Required]
        public int OrderId { get; set; }
        public DateTime? Date { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;

    }
}
