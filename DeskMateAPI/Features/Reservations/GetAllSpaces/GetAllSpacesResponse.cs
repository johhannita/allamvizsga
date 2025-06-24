using DeskMateAPI.Entities.RawModels;

namespace DeskMateAPI.Features.Reservations.GetAllSpaces
{
    public class GetAllSpacesResponse
    {
        public IEnumerable<Space> Spaces { get; set; }

        public GetAllSpacesResponse(IEnumerable<Space> spaces)
        {
            Spaces = spaces;
        }
    }
}
