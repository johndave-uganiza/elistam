using eListam.API.Common;
using eListam.Application.DTOs.Auth;
using eListam.Application.Services.Abstractions.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace eListamAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController : Controller
    {
        #region Fields
        private readonly IAuthService _authService;
        #endregion

        #region Constructor
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        #endregion

        #region Users
        [HttpGet("users")]
        public async Task<IActionResult> GetAsync()
        {
            var applicationUsers = await _authService.GetApplicationUsersAsync();

            if (applicationUsers == null)
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = true,
                    Messages = []
                });
            }

            return Ok(new ApiResponse()
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
                Data = applicationUsers,
                Messages = []
            });
        }
        #endregion

        #region Login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            // Find user by email
            var applicationUser = await _authService.LoginAsync(request);

            if (applicationUser == null)
            {
                return NotFound(new ApiResponse()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    IsSuccess = true,
                    Messages = []
                });
            }

            return Ok(new ApiResponse()
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
                Data = applicationUser,
                Messages = []
            });
        }
        #endregion

        #region LogoutAsync
        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await _authService.LogoutAsync();

            return Ok();
        }
        #endregion

        #region Register
        //[AllowAnonymous]
        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        //{
        //    ApiResponse apiResponse = new ApiResponse();
        //    // Create new Application User if the RegisterDTO model is valid
        //    if (!ModelState.IsValid)
        //    {
        //        apiResponse.StatusCode = HttpStatusCode.BadRequest;
        //        apiResponse.IsSuccess = false;
        //        foreach (var value in ModelState.Values)
        //        {
        //            foreach (var error in value.Errors)
        //            {
        //                apiResponse.Messages = [error.ErrorMessage];
        //            }
        //        }

        //        return BadRequest(apiResponse);
        //    }


        //    ApplicationUser newApplicationUser = new ApplicationUser()
        //    {
        //        UserName = request.UserName,
        //        Email = request.Email,
        //        NormalizedUserName = request.UserName.ToUpper(),
        //        NormalizedEmail = request.Email.ToUpper()
        //    };

        //    var result = await _userManager.CreateAsync(newApplicationUser, request.Password);
        //    if (!result.Succeeded)
        //    {
        //        foreach (var error in result.Errors)
        //        {
        //            apiResponse.Messages = [error.Description];
        //        }
        //        apiResponse.StatusCode = HttpStatusCode.BadRequest;
        //        apiResponse.IsSuccess = false;
        //        return BadRequest(apiResponse);
        //    }

        //    // Create roles if not exist
        //    if (!await _roleManager.RoleExistsAsync(Role.Admin))
        //    {
        //        await _roleManager.CreateAsync(new IdentityRole(Role.Admin));
        //        await _roleManager.CreateAsync(new IdentityRole(Role.Demo));
        //    }

        //    // Assign the given role
        //    if (request.Role.Equals(Role.Admin, StringComparison.CurrentCultureIgnoreCase))
        //    {
        //        await _userManager.AddToRoleAsync(newApplicationUser, Role.Admin);
        //    }
        //    else
        //    {
        //        await _userManager.AddToRoleAsync(newApplicationUser, Role.User);
        //    }

        //    apiResponse.StatusCode = HttpStatusCode.OK;
        //    apiResponse.IsSuccess = true;
        //    return Ok(apiResponse);
        //}
        #endregion
    }
}
