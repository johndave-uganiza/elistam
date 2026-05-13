using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eListamAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsPosted { get; set; }
        public string UserId { get; set; } = string.Empty;
        public ICollection<OrderDetail> OrderDetails { get; set; } = null!;
    }
}
