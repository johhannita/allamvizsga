using DeskMateAPI.Entities;

namespace DeskMateAPI.Features.Reservations.GetReservations
{
    public class GetReservationsResponse
    {
        public IEnumerable<ReservationOverView> Reservations { get; set; }

        public GetReservationsResponse(List<ReservationOverView> reservations)
        {
            Reservations = reservations;
        }
    }
}
