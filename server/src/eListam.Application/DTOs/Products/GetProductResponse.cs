namespace eListam.Application.DTOs.Products
{
    public class GetProductResponse
    {
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Stock { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
