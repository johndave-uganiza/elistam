using System.ComponentModel.DataAnnotations;

namespace eListam.Application.DTOs.Transactions
{
    public class GetTransactionDetailResponse
    {
        public int Id { get; set; }
        public int TransactionId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
