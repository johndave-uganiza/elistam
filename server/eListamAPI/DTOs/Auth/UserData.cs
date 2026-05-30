namespace eListamAPI.DTOs.Auth
{
    public record UserData(
     string UserName,
     string Email,
     string Password,
     string Role);
}
