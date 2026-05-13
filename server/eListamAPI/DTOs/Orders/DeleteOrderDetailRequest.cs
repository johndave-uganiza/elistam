using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Orders
{
    public class DeleteOrderDetailRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int OrderId { get; set; }
    }
}
