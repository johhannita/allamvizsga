using MediatR;

namespace DeskMateAPI.Features.Reservations.GetUserYearlyOverview
{
    public class GetUserYearlyOverviewRequest : IRequest<GetUserYearlyOverviewResponse>
    {
        public required string UserId { get; set; }

        public DateTime Year { get; set; }
    }
}
