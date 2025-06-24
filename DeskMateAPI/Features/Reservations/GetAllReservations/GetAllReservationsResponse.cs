using DeskMateAPI.Entities;

namespace DeskMateAPI.Features.Reservations.GetAllReservations
{
    public class GetAllReservationsResponse
    {
        public IEnumerable<ReservationOverView> Reservations { get; set; }

        public GetAllReservationsResponse(List<ReservationOverView> reservations)
        {
            Reservations = reservations;
        }
    }
}
