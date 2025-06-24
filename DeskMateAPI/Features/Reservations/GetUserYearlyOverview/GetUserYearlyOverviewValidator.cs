using DeskMateAPI.Utils;
using FluentValidation;

namespace DeskMateAPI.Features.Reservations.GetUserYearlyOverview
{
    public class GetUserYearlyOverviewValidator : AbstractValidator<GetUserYearlyOverviewRequest>
    {
        public GetUserYearlyOverviewValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("UserId must be a valid ObjectId.");
            RuleFor(x => x.Year).NotEmpty();

        }

    }
}
