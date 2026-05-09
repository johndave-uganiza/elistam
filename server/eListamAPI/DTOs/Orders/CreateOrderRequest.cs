using eListamAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Orders
{
    public class CreateOrderRequest
    {
        public DateTime? Date { get; set; }
        public CreateOrderDetailRequest OrderDetail { get; set; } = null!;
    }
}
