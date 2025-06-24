using MediatR;

namespace DeskMateAPI.Features.Reservations.GetReservations
{
    public class GetReservationsRequest : IRequest<GetReservationsResponse>
    {
        public required string UserId { get; set; }
    }
}
