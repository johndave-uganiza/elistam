namespace eListam.Application.Common
{
    public class Result<T> where T: class
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public FailureType FailureType { get; set; }

        internal Result<T> Success(T? data = null, string message = "Success")
            => CreateResult(data, message);
        
        internal Result<T> Failure(T? data = null, string message = "Failed", FailureType failureType = FailureType.Unknown)
            => CreateResult(data, message, failureType);

        private Result<T> CreateResult(T? data, string message)
            => new()
            {
                IsSuccess = true,
                Data = data,
                Message = message,
            };

        private Result<T> CreateResult(T? data, string message, FailureType failureType)
            => new()
            {
                IsSuccess = false,
                Data = data,
                Message = message,
                FailureType = failureType
            };
    }
}
