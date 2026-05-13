using eListamAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Orders
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
