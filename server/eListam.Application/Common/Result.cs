using System.Net;

namespace eListam.Application.Common
{
    public class Result<T> where T: class
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public Result<T> Success(string message = "Success")
        {
            return new Result<T> { IsSuccess = true, Message = message };
        }
        public Result<T> Success(T? data = null, string message = "Success")
        {
            return new Result<T> { IsSuccess = true, Data = data, Message = message };
        }
        public Result<T> Failure(string message = "Failed")
        {
            return new Result<T> { IsSuccess = false, Message = message };
        }
    }
}
