namespace eListam.Application.DTOs.Items
{
    public class GetItemResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public decimal Stock { get; set; }
        public string? Image { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime? ExpirationDate { get; set; }
    }
}
