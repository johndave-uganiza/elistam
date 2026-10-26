using eListam.API.Common;
using eListam.Application.Common;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace eListam.API.Common
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public object? Data { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}

public static class ApiResponseExtensions
{
    public static IActionResult GetObjectResult<T>(
        this ControllerBase controller,
        Result<T> result) where T : class
    {
        if (result.IsSuccess) 
            return controller.Ok(new ApiResponse
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = result.IsSuccess,
                Data = result.Data,
                Message = result.Message
            });
        

        return result.FailureType switch
        {
            FailureType.NotFound => controller.NotFound(new ApiResponse
            {
                StatusCode = HttpStatusCode.NotFound,
                IsSuccess = result.IsSuccess,
                Message = result.Message
            }),

            FailureType.Validation => controller.BadRequest(new ApiResponse
            {
                StatusCode = HttpStatusCode.BadRequest,
                IsSuccess = result.IsSuccess,
                Message = result.Message
            }),

            FailureType.Conflict => controller.Conflict(new ApiResponse
            {
                StatusCode = HttpStatusCode.Conflict,
                IsSuccess = result.IsSuccess,
                Message = result.Message
            }),

            _ => controller.Problem(
                statusCode: StatusCodes.Status500InternalServerError,
                detail: "An unexpected error occurred.")
        };
    }
}