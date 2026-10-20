namespace eListam.Application
{
    public class Result<T> where T: class
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public Result<T> Success(T? data = null, string message = "Success")
            => CreateResult(data, message, true);
        
        public Result<T> Failure(T? data = null, string message = "Failed") 
            => CreateResult(data, message, false);
        

        private Result<T> CreateResult(T? data, string message, bool isSuccess) => new()
        {
            IsSuccess = isSuccess,
            Data = data,
            Message = message
        };
    }
}
