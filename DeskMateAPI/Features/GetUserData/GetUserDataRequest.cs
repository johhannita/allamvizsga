using MediatR;

namespace DeskMateAPI.Features.GetUserData
{
    public class GetUserDataRequest : IRequest<GetUserDataResponse>
    {
        public required string UserId { get; set; }
    }
}
