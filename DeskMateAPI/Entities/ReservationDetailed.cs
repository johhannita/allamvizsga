using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;

namespace DeskMateAPI.Entities
{
    public class ReservationDetailed
    {
        public string? Id { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public string? SpanX { get; set; }

        public string? SpanY { get; set; }

        public ESpaceType Type { get; set; }

        public ERequestStatus Status { get; set; }

        public string? ReservedBy { get; set; }

        public string? ReservedById { get; set; }

        public string? Label { get; set; }

        public ReservationDetailed(Space space, Reservation? reservation, User? reservedBy)
        {
            Id = space.Id;
            X = space.X;
            Y = space.Y;
            SpanX = space.SpanX;
            SpanY = space.SpanY;
            Type = (ESpaceType)space.Type;
            Status = reservation != null
                ? (ERequestStatus)reservation.Status
                : ((ESpaceType)space.Type == ESpaceType.Desk ? ERequestStatus.Free : ERequestStatus.Undefined);
            ReservedBy = GetFullName(reservedBy);
            ReservedById = reservedBy?.Id;
            Label = space.Label;
        }

        private string GetFullName(User? user)
        {
            if (user == null)
            {
                return "";
            }
            return $"{user.FirstName} {user.LastName}";
        }

    }
}
