using eListamAPI.Constants;
using System.ComponentModel.DataAnnotations;

namespace eListamAPI.DTOs.Auth
{
    public class RegisterRequest
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
