using DeskMateAPI.Data;
using DeskMateAPI.Entities;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.GetReservations
{
    public class GetReservationsHandler : IRequestHandler<GetReservationsRequest, GetReservationsResponse>
    {
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly IMongoCollection<Space> _spaces;

        public GetReservationsHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
            _spaces = mongoDbService.Database.GetCollection<Space>("Spaces");
        }

        public async Task<GetReservationsResponse> Handle(GetReservationsRequest request, CancellationToken cancellationToken)
        {
            var spaces = await _spaces.Find(_ => true).ToListAsync(cancellationToken);

            var filterBuilder = Builders<Reservation>.Filter;
            var filter = filterBuilder.Eq(r => r.ReservedBy, request.UserId) &
                         filterBuilder.Ne(r => r.Status, (int)ERequestStatus.Undefined) &
                         filterBuilder.Eq(r => r.EndDate, null);

            var reservations = await _reservations
                .Find(filter)
                .SortByDescending(r => r.Date)
                .ToListAsync(cancellationToken);

            var result = reservations.Select(r => new ReservationOverView
            {
                Id = r.Id!,
                StartDate = r.Date,
                Status = r.Status,
                Label = spaces.FirstOrDefault(s => s.Id == r.ReservedSpace)?.Label,
                Notes = r.Notes
            }).ToList();

            return new GetReservationsResponse(result);
        }
    }
}
