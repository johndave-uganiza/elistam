namespace eListamAPI.DTOs.Orders
{
    public class UpdateOrderDetailRequest
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public double Quantity { get; set; }
    }
}
