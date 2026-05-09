using System.Net;

namespace eListamAPI.Models
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public object? Data { get; set; }
        public IEnumerable<string> Messages { get; set; } = [];
    }
}
