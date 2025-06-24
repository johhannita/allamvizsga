using DeskMateAPI.Entities;

namespace DeskMateAPI.Features.Reservations.GetHomeOffice
{
    public class GetHomeOfficeResponse
    {
        public IEnumerable<ReservationOverView> HomeOfficeRequests { get; set; }

        public GetHomeOfficeResponse(List<ReservationOverView> reservations)
        {
            HomeOfficeRequests = reservations;
        }
    }
}
