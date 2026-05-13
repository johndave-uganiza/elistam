namespace eListamAPI.DTOs.DummyProducts
{
    public class GetDummyProductResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Stock { get; set; }
        public string ThumbNail { get; set; } = string.Empty;
    }
}
