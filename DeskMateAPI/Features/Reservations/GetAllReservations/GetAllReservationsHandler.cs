using DeskMateAPI.Data;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;
using DeskMateAPI.Entities;
using DeskMateAPI.Features.Reservations.GetReservations;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.GetAllReservations
{
    public class GetAllReservationsHandler : IRequestHandler<GetAllReservationsRequest, GetAllReservationsResponse>
    {
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly IMongoCollection<Space> _spaces;
        private readonly IMongoCollection<User> _users;


        public GetAllReservationsHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
            _spaces = mongoDbService.Database.GetCollection<Space>("Spaces");
            _users = mongoDbService.Database.GetCollection<User>("Users");
        }

        public async Task<GetAllReservationsResponse> Handle(GetAllReservationsRequest request, CancellationToken cancellationToken)
        {
            var spaces = await _spaces.Find(_ => true).ToListAsync(cancellationToken);
            var allUsers = await _users.Find(_ => true).ToListAsync(cancellationToken);

            var filterBuilder = Builders<Reservation>.Filter;
            var filter = filterBuilder.Eq(r => r.Status, (int)ERequestStatus.Requested);

            var reservations = await _reservations
                .Find(filter)
                .SortBy(r => r.Date)
                .ToListAsync(cancellationToken);


            var result = reservations.Select(r =>
            {
                var reservedByUser = allUsers.FirstOrDefault(u => u.Id == r.ReservedBy);

                return new ReservationOverView
                {
                    Id = r.Id!,
                    StartDate = r.Date,
                    EndDate = r.EndDate,
                    Status = r.Status,
                    Label = spaces.FirstOrDefault(s => s.Id == r.ReservedSpace)?.Label,
                    Notes = r.Notes,
                    ReservedBy = reservedByUser != null
                        ? new UserData(reservedByUser.Id, reservedByUser.FirstName, reservedByUser.LastName, reservedByUser.Email)
                        : null,
                };
            }).ToList();

            return new GetAllReservationsResponse(result);
        }
    }
}