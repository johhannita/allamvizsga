using MediatR;

namespace DeskMateAPI.Features.Reservations.GetSpacesForReservation
{
    public class GetSpacesForReservationRequest : IRequest<GetSpacesForReservationResponse>
    {
        public DateTime ReservationDate { get; set; }
    }
}
