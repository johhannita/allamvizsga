using DeskMateAPI.Data;
using DeskMateAPI.Entities.RawModels;
using DeskMateAPI.Entities;
using DeskMateAPI.Features.GetAllUsers;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.GetUserData
{
    public class GetUserDataHandler : IRequestHandler<GetUserDataRequest, GetUserDataResponse>
    {
        private readonly IMongoCollection<User> _users;

        public GetUserDataHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _users = mongoDbService.Database.GetCollection<User>("Users");
        }

        public async Task<GetUserDataResponse> Handle(GetUserDataRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var users = await _users.Find(_ => true).ToListAsync(cancellationToken);

                var user = users.FirstOrDefault(u => u.Id == request.UserId);

                if (user == null)
                {
                    throw new Exception("An error has occured.");
                }

                return new GetUserDataResponse(new UserData(user.Id, user.FirstName, user.LastName, user.Email, user.Team));
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to fetch users", ex);
            }
        }


    }
}
