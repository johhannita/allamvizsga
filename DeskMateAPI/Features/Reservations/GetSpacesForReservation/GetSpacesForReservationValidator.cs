using FluentValidation;

namespace DeskMateAPI.Features.Reservations.GetSpacesForReservation
{
    public class GetSpacesForReservationValidator : AbstractValidator<GetSpacesForReservationRequest>
    {
        public GetSpacesForReservationValidator()
        {
            RuleFor(x => x.ReservationDate).NotEmpty();
        }
    }
}
