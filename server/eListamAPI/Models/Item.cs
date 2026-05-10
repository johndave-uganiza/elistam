using System.ComponentModel.DataAnnotations;

namespace eListamAPI.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}
