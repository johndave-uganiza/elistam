namespace eListam.Application.DTOs.Items
{
    public class GetItemResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Quantity { get; set; }
        public string? Image { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}
