using eListamAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Transactions
{
    public class GetTransactionResponse
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsPosted { get; set; }
        public string UserId { get; set; } = string.Empty;
        public IEnumerable<GetTransactionDetailResponse>? TransactionDetails { get; set; }
    }
}
