using DeskMateAPI.Data;
using DeskMateAPI.Entities;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.GetSpacesForReservation
{
    public class GetSpacesForReservationHandler : IRequestHandler<GetSpacesForReservationRequest, GetSpacesForReservationResponse>
    {
        private readonly IMongoCollection<Space> _spaces;
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly IMongoCollection<User> _users;

        public GetSpacesForReservationHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _spaces = mongoDbService.Database.GetCollection<Space>("Spaces");
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
            _users = mongoDbService.Database.GetCollection<User>("Users");
        }
        public async Task<GetSpacesForReservationResponse> Handle(GetSpacesForReservationRequest request, CancellationToken cancellationToken)
        {
            var currentDate = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
            var dayStart = DateTime.SpecifyKind(request.ReservationDate.Date, DateTimeKind.Utc);
            var dayEnd = dayStart.AddDays(1);

            var reservationFilter = Builders<Reservation>.Filter.And(
                Builders<Reservation>.Filter.Gte(r => r.Date, dayStart),
                Builders<Reservation>.Filter.Lt(r => r.Date, dayEnd)
            );

            var reservationsForDay = await _reservations.Find(reservationFilter).ToListAsync(cancellationToken);
            var allSpaces = await _spaces.Find(_ => true).ToListAsync(cancellationToken);
            var allUsers = await _users.Find(_ => true).ToListAsync(cancellationToken);

            var reservationList = new List<ReservationDetailed>();
            allSpaces.ForEach(space =>
            {
                var reservationForSpace = reservationsForDay.FirstOrDefault(reservation => reservation.ReservedSpace == space.Id && (ERequestStatus)reservation.Status != ERequestStatus.Undefined);
                var userForReservation = reservationForSpace != null
                ? allUsers.FirstOrDefault(u => u.Id == reservationForSpace.ReservedBy)
                : null;

                reservationList
                .Add(new ReservationDetailed(
                    space,
                    reservation: reservationForSpace,
                    reservedBy: userForReservation
                    )
                );
            }
            );

            return new GetSpacesForReservationResponse(reservationList);
        }
    }
}
