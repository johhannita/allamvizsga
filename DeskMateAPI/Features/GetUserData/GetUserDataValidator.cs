using DeskMateAPI.Features.Reservations.GetHomeOffice;
using DeskMateAPI.Utils;
using FluentValidation;

namespace DeskMateAPI.Features.GetUserData
{
    public class GetUserDataValidator : AbstractValidator<GetUserDataRequest>
    {
        public GetUserDataValidator()
        {

            RuleFor(x => x.UserId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("UserId must be a valid ObjectId.");
        }
    }
}
