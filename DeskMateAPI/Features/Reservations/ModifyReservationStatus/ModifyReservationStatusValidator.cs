using DeskMateAPI.Utils;
using FluentValidation;
using MongoDB.Bson;

namespace DeskMateAPI.Features.Reservations.ModifyReservationStatus
{
    public class ModifyReservationStatusValidator : AbstractValidator<ModifyReservationStatusRequest>
    {
        public ModifyReservationStatusValidator()
        {
            RuleFor(x => x.ReservationId).NotEmpty().Must(MongoUtils.IsValidObjectId).WithMessage("ReservationId must be a valid ObjectId.");

        }
    }
}
