using MediatR;

namespace DeskMateAPI.Features.Auth
{
    public class AuthRequest : IRequest<AuthResponse>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
