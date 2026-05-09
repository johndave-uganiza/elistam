using System.ComponentModel.DataAnnotations;

namespace eListamAPI.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsPosted { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
