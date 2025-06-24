using DeskMateAPI.Data;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.GetHomeOffice
{
    public class GetHomeOfficeHandler : IRequestHandler<GetHomeOfficeRequest, GetHomeOfficeResponse>
    {
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly IMongoCollection<Space> _spaces;

        public GetHomeOfficeHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
            _spaces = mongoDbService.Database.GetCollection<Space>("Spaces");
        }

        public async Task<GetHomeOfficeResponse> Handle(GetHomeOfficeRequest request, CancellationToken cancellationToken)
        {
            var filterBuilder = Builders<Reservation>.Filter;
            var filter = filterBuilder.Eq(r => r.ReservedBy, request.UserId) &
                         filterBuilder.Ne(r => r.Status, (int)ERequestStatus.Undefined) &
                         filterBuilder.Ne(r => r.EndDate, null);

            var reservations = await _reservations
                .Find(filter)
                .SortByDescending(r => r.Date)
                .ToListAsync(cancellationToken);

            var result = reservations.Select(r => new ReservationOverView
            {
                Id = r.Id!,
                StartDate = r.Date,
                EndDate = r.EndDate,
                Status = r.Status,
                Notes = r.Notes
            }).ToList();

            return new GetHomeOfficeResponse(result);
        }
    }
}
