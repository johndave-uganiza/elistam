using Microsoft.AspNetCore.Http;

namespace eListam.Application.DTOs.Items
{
    public class CreateItemRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Cost { get; set;}
        public double Stock { get; set; }
        public IFormFile? ImageFile { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTime? ExpirationDate { get; set; }
    }
}
