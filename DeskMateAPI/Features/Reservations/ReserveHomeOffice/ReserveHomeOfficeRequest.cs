using DeskMateAPI.Entities.Enums;
using MediatR;

namespace DeskMateAPI.Features.Reservations.ReserveHomeOffice
{
    public class ReserveHomeOfficeRequest : IRequest<ReserveHomeOfficeResponse>
    {
        public required string UserId { get; set; }

        public DateTime Date { get; set; }

        public DateTime EndDate { get; set; }

        public ERequestStatus Status { get; set; }

        public string? Notes { get; set; }
    }
}
