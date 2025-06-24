using DeskMateAPI.Data;
using DeskMateAPI.Entities;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;
using System.Reflection.Emit;

namespace DeskMateAPI.Features.GetAllUsers
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsersRequest, GetAllUsersResponse>
    {
        private readonly IMongoCollection<User> _users;

        public GetAllUsersHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _users = mongoDbService.Database.GetCollection<User>("Users");
        }

        public async Task<GetAllUsersResponse> Handle(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var users = await _users.Find(_ => true).ToListAsync(cancellationToken);

                var result = users.Select(u => new UserData(u.Id, u.FirstName, u.LastName, u.Email, u.Team)).ToList();

                return new GetAllUsersResponse(result);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to fetch users", ex);
            }
        }


    }
}
