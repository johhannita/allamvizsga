using MediatR;

namespace DeskMateAPI.Features.Reservations.GetHomeOffice
{
    public class GetHomeOfficeRequest : IRequest<GetHomeOfficeResponse>
    {
        public required string UserId { get; set; }
    }
}
