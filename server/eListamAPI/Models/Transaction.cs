using System.ComponentModel.DataAnnotations;

namespace eListamAPI.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsPosted { get; set; }
        public string UserId { get; set; } = string.Empty;
        public ICollection<TransactionDetail>? TransactionDetails { get; set; }
    }
}
