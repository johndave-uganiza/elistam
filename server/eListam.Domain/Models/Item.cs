using System.ComponentModel.DataAnnotations;

namespace eListam.Domain.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string? Image { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
