using DeskMateAPI.Utils;
using FluentValidation;

namespace DeskMateAPI.Features.Reservations.ReserveSpace
{
    public class ReserveSpaceValidator : AbstractValidator<ReserveSpaceRequest>
    {
        public ReserveSpaceValidator()
        {
            RuleFor(x => x.Date).NotEmpty().GreaterThan(DateTime.Now.AddDays(-1));
            RuleFor(x => x.SpaceId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("SpaceId must be a valid ObjectId.");
            RuleFor(x => x.UserId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("UserId must be a valid ObjectId.");
        }
    }
}
