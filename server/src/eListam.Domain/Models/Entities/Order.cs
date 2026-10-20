namespace eListam.Domain.Models.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal TotalQuantity { get; set; }
        public bool IsCompleted { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public ICollection<OrderDetail> OrderDetails { get; set; } = null!;
    }

    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Quantity { get; set; }
        public string Image { get; set; } = string.Empty;
        public Order Order { get; set; } = null!;
        public Item Item { get; set; } = null!;
    }
}
