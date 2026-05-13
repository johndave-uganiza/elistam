using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eListamAPI.Models
{
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
