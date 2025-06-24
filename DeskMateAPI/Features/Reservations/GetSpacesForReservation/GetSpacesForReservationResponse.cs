using DeskMateAPI.Entities;

namespace DeskMateAPI.Features.Reservations.GetSpacesForReservation
{
    public class GetSpacesForReservationResponse
    {
        public IEnumerable<ReservationDetailed> Spaces { get; set; }

        public GetSpacesForReservationResponse(List<ReservationDetailed> spaces)
        {
            Spaces = spaces;
        }
    }
}
