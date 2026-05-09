using eListamAPI.Constants;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Auth
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
