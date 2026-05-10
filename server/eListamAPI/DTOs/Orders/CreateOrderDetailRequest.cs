using eListamAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Orders
{
    public class CreateOrderDetailRequest
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
