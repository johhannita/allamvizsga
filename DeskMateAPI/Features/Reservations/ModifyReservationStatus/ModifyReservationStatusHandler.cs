using DeskMateAPI.Data;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;
using MediatR;
using MongoDB.Driver;
using System.Security.Claims;

namespace DeskMateAPI.Features.Reservations.ModifyReservationStatus
{
    public class ModifyReservationStatusHandler : IRequestHandler<ModifyReservationStatusRequest, ModifyReservationStatusResponse>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMongoCollection<Reservation> _reservations;

        public ModifyReservationStatusHandler(MongoDbService mongoDbService, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
        }
        public async Task<ModifyReservationStatusResponse> Handle(ModifyReservationStatusRequest request, CancellationToken cancellationToken)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Id, request.ReservationId);
            var update = Builders<Reservation>.Update.Set(r => r.Status, (int)request.NewStatus);

            var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role);

            if (userRole == "user")
            {
                var reservation = await _reservations.Find(r => r.Id == request.ReservationId).FirstOrDefaultAsync(cancellationToken);

                if (reservation == null)
                    throw new Exception("An error has occured.");

                if (reservation.ReservedBy != userId)
                    throw new UnauthorizedAccessException("You can only modify your own reservations.");

                if (request.NewStatus == ERequestStatus.Reserved)
                {
                    throw new UnauthorizedAccessException("You are not allowed to make this change.");
                }
            }

            var result = await _reservations.UpdateOneAsync(filter, update, cancellationToken: cancellationToken);

            if (result.MatchedCount == 0)
            {
                throw new KeyNotFoundException($"No reservation found with ID {request.ReservationId}");
            }

            return new ModifyReservationStatusResponse();
        }
    }
}
