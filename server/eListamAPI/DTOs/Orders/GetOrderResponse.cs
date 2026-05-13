namespace eListamAPI.DTOs.Orders
{
    public class GetOrderResponse
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public double TotalQuantity { get; set; }
        public bool IsPosted { get; set; }
        public string UserId { get; set; } = string.Empty;
        public IEnumerable<GetOrderDetailResponse> OrderDetails { get; set; } = [];
    }
}
