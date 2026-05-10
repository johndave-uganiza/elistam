using System.ComponentModel.DataAnnotations;

namespace eListamAPI.Models
{
    public class TransactionDetail
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
        public Transaction Transaction { get; set; } = null!;
    }
}
