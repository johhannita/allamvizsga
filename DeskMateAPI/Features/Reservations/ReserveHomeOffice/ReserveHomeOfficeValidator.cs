using DeskMateAPI.Utils;
using FluentValidation;

namespace DeskMateAPI.Features.Reservations.ReserveHomeOffice
{
    public class ReserveHomeOfficeValidator : AbstractValidator<ReserveHomeOfficeRequest>
    {
        public ReserveHomeOfficeValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("UserId must be a valid ObjectId.");
            RuleFor(x => x.Date).NotEmpty().GreaterThan(DateTime.Now.AddDays(-1)).WithMessage("Date must be in the future.");
            RuleFor(x => x.EndDate).NotEmpty().GreaterThan(DateTime.Now.AddDays(-1)).WithMessage("End Date must be in the future.");
        }
    }
}
