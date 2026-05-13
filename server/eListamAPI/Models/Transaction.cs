using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eListamAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsPosted { get; set; }
        public string UserId { get; set; } = string.Empty;
        public Order Order { get; set; } = null!;
        public ICollection<TransactionDetail> TransactionDetails { get; set; } = null!;
    }
}
