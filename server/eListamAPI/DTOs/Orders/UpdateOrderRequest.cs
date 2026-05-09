using eListamAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Orders
{
    public class UpdateOrderRequest
    {
        public int OrderId { get; set; }
        public DateTime? Date { get; set; }
    }
}
