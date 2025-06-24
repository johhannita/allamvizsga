using DeskMateAPI.Data;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;
using DeskMateAPI.Features.Reservations.ReserveSpace;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.ReserveHomeOffice
{
    public class ReserveHomeOfficeHandler : IRequestHandler<ReserveHomeOfficeRequest, ReserveHomeOfficeResponse>
    {
        private readonly IMongoCollection<Reservation> _reservations;

        public ReserveHomeOfficeHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
        }

        public async Task<ReserveHomeOfficeResponse> Handle(ReserveHomeOfficeRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var dateOnly = DateTime.SpecifyKind(request.Date.Date, DateTimeKind.Utc);
                var EndDateOnly = DateTime.SpecifyKind(request.EndDate.Date, DateTimeKind.Utc);

                var existingReservation = await _reservations
                    .Find(r =>
                        r.ReservedBy == request.UserId
                        && (r.Date == dateOnly || r.EndDate == EndDateOnly))
                    .FirstOrDefaultAsync(cancellationToken);

                if (existingReservation != null)
                {
                    throw new InvalidOperationException("A reservation for this date already exist.");
                }

                var reservation = new Reservation
                {
                    Date = dateOnly,
                    EndDate = EndDateOnly,
                    Status = (int)request.Status,
                    ReservedBy = request.UserId,
                    Notes = request.Notes
                };

                await _reservations.InsertOneAsync(reservation, cancellationToken: cancellationToken);

                return new ReserveHomeOfficeResponse();
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