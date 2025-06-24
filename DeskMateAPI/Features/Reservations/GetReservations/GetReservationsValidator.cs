using DeskMateAPI.Utils;
using FluentValidation;
using MongoDB.Bson;

namespace DeskMateAPI.Features.Reservations.GetReservations
{
    public class GetReservationsValidator : AbstractValidator<GetReservationsRequest>
    {
        public GetReservationsValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("UserId must be a valid ObjectId.");
        }
    }
}
