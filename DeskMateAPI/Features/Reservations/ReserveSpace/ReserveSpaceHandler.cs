using DeskMateAPI.Data;
using DeskMateAPI.Entities.Enums;
using MediatR;
using MongoDB.Driver;
using DeskMateAPI.Entities.RawModels;

namespace DeskMateAPI.Features.Reservations.ReserveSpace
{
    public class ReserveSpaceHandler : IRequestHandler<ReserveSpaceRequest, ReserveSpaceResponse>
    {
        private readonly IMongoCollection<Reservation> _reservations;

        public ReserveSpaceHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
        }

        public async Task<ReserveSpaceResponse> Handle(ReserveSpaceRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var dateOnly = DateTime.SpecifyKind(request.Date.Date, DateTimeKind.Utc);

                var existingReservation = await _reservations.Find(r =>
                    r.ReservedSpace == request.SpaceId &&
                    r.Date == dateOnly).FirstOrDefaultAsync(cancellationToken);

                if (existingReservation != null)
                {
                    throw new InvalidOperationException("A reservation for this user and space already exists on this date.");
                }

                var reservation = new Reservation
                {
                    Date = dateOnly,
                    Status = (int)ERequestStatus.Requested,
                    ReservedBy = request.UserId,
                    ReservedSpace = request.SpaceId,
                    Notes = request.Notes
                };

                await _reservations.InsertOneAsync(reservation, cancellationToken: cancellationToken);

                return new ReserveSpaceResponse();
            }
            catch (ArgumentException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("An unexpected error occurred while reserving the space.", ex);
            }
        }
    }
}