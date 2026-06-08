using System.Net;

namespace eListam.Application.Common
{
    public class Result<T> where T: class
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
