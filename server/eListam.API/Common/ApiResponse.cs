using System.Net;

namespace eListam.API.Common
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public object? Data { get; set; }
        public IEnumerable<string> Messages { get; set; } = [];
    }
}
