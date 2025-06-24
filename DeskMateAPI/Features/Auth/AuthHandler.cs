using DeskMateAPI.Data;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Auth
{
    public class AuthHandler : IRequestHandler<AuthRequest, AuthResponse>
    {
        private readonly IMongoCollection<User> _users;
        private readonly TokenGenerator _tokenGenerator;

        public AuthHandler(MongoDbService dbService, TokenGenerator tokenGenerator)
        {
            _users = dbService.Database.GetCollection<User>("Users");
            _tokenGenerator = tokenGenerator;
        }

        public async Task<AuthResponse> Handle(AuthRequest request, CancellationToken cancellationToken)
        {
            var user = await _users.Find(u => u.Email == request.Email && u.Password == request.Password).FirstOrDefaultAsync();

            if (user == null)
                throw new UnauthorizedAccessException("Invalid credentials");

            var token = _tokenGenerator.GenerateToken(user.Id, user.Email, user.Role);
            return new AuthResponse(token, user);
        }
    }
}
