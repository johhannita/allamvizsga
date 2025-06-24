using MediatR;

namespace DeskMateAPI.Features.Reservations.ReserveSpace
{
    public class ReserveSpaceRequest : IRequest<ReserveSpaceResponse>
    {
        public required string UserId { get; set; }

        public required string SpaceId { get; set; }

        public DateTime Date { get; set; }

        public string? Notes { get; set; }
    }
}
