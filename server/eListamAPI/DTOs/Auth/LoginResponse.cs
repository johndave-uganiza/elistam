using eListamAPI.Constants;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Auth
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
    }
}
