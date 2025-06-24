using DeskMateAPI.Entities.Enums;
using MediatR;

namespace DeskMateAPI.Features.Reservations.ModifyReservationStatus
{
    public class ModifyReservationStatusRequest : IRequest<ModifyReservationStatusResponse>
    {
        public required string ReservationId { get; set; }

        public ERequestStatus NewStatus { get; set; }
    }
}
