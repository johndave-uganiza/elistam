namespace eListam.Domain.Models.ReadModels
{
    public class Dashboard
    {
        public int Year { get; set; }
        public decimal Revenue { get; set; }
        public decimal COGS { get; set; }
        public decimal Gross { get; set; }
        public decimal Net { get; set; }
    }
}
