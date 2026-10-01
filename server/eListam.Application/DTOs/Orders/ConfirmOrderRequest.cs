using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Orders
{
    public class ConfirmOrderRequest
    {
        [Required]
        public int OrderId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
