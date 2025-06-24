using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;

namespace DeskMateAPI.Features.Auth
{
    public class AuthResponse
    {
        public string Token { get; set; }

        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public ERole Role { get; set; }

        public AuthResponse(string token, User user)
        {
            Token = token;
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Role = user.Role == "admin" ? ERole.Admin : ERole.User;
        }
    }
}
