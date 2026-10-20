
using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Transactions
{
    public class GetTransactionResponse
    {
        public int Id { get; set; }
        public string TransactionNumber { get; set; } = string.Empty;
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal TotalQuantity { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public string UserId { get; set; } = string.Empty;
        public IEnumerable<GetTransactionDetailResponse>? TransactionDetails { get; set; }
    }

    public class GetTransactionDetailResponse
    {
        public int Id { get; set; }
        public int TransactionId { get; set; }
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
