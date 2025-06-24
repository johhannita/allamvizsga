using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DeskMateAPI.Entities
{
    public class ReservationOverView
    {
        public required string Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int Status { get; set; }

        public string? Label { get; set; }

        public string? Notes { get; set; }

        public UserData? ReservedBy { get; set; }
    }
}
