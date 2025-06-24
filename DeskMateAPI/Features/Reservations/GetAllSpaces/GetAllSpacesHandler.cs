using DeskMateAPI.Data;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.GetAllSpaces
{
    public class GetAllSpacesHandler : IRequestHandler<GetAllSpacesRequest, GetAllSpacesResponse>
    {
        private readonly IMongoCollection<Space> _spaces;


        public GetAllSpacesHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _spaces = mongoDbService.Database.GetCollection<Space>("Spaces");
        }

        public async Task<GetAllSpacesResponse> Handle(GetAllSpacesRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var spaces = await _spaces.Find(_ => true).ToListAsync();
                return new GetAllSpacesResponse(spaces);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to fetch users", ex);
            }
        }


    }
}