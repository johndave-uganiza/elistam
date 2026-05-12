using eListamAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Orders
{
    public class CreateOrderRequest
    {
        public DateTime? Date { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
