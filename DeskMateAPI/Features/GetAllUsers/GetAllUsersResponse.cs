using DeskMateAPI.Entities;
using DeskMateAPI.Entities.RawModels;

namespace DeskMateAPI.Features.GetAllUsers
{
    public class GetAllUsersResponse
    {
        public IEnumerable<UserData> Users { get; set; }

        public GetAllUsersResponse(List<UserData> users)
        {
            Users = users;
        }
    }
}
