using DeskMateAPI.Utils;
using FluentValidation;

namespace DeskMateAPI.Features.Reservations.GetHomeOffice
{
    public class GetHomeOfficeValidator : AbstractValidator<GetHomeOfficeRequest>
    {
        public GetHomeOfficeValidator()
        {

            RuleFor(x => x.UserId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("UserId must be a valid ObjectId.");
        }
    }
}
