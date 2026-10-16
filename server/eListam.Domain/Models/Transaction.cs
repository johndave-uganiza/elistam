using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eListam.Domain.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string TransactionNumber { get; set; } = string.Empty;
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsCompleted { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public Order Order { get; set; } = null!;
        public ICollection<TransactionDetail> TransactionDetails { get; set; } = null!;
    }

    public class TransactionDetail
    {
        public int Id { get; set; }
        public int TransactionId { get; set; }
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
        public Transaction Transaction { get; set; } = null!;
        public Item Item { get; set; } = null!;
    }
}
