using DeskMateAPI.Entities;

namespace DeskMateAPI.Features.GetUserData
{
    public class GetUserDataResponse
    {
        public UserData UserData { get; set; }

        public GetUserDataResponse(UserData userData)
        {
            UserData = userData;
        }
    }
}
