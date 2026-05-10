namespace eListamAPI.DTOs.Items
{
    public class ItemCreateRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public IFormFile? File { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
