using FluentValidation;

namespace DeskMateAPI.Features.GetAllUsers
{
    public class GetAllUsersValidator : AbstractValidator<GetAllUsersRequest>
    {
        public GetAllUsersValidator()
        {
        }
    }
}