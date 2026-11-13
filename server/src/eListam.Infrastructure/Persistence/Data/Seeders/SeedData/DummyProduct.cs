namespace eListam.Infrastructure.Persistence.Data.Seeders.SeedData
{
    public class DummyProduct
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Stock { get; set; }
        public string ThumbNail { get; set; } = string.Empty;
    }
}
