using DeskMateAPI.Entities;

namespace DeskMateAPI.Features.Reservations.GetUserYearlyOverview
{
    public class GetUserYearlyOverviewResponse
    {
        public IEnumerable<ReservationOverView> Reservations { get; set; }

        public GetUserYearlyOverviewResponse(List<ReservationOverView> reservations)
        {
            Reservations = reservations;
        }
    }
}
