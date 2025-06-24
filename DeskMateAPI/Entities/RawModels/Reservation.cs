using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DeskMateAPI.Entities.RawModels
{
    public class Reservation
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("date"), BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime Date { get; set; }

        [BsonElement("endDate"), BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime? EndDate { get; set; }

        [BsonElement("status"), BsonRepresentation(BsonType.Int32)]
        public int Status { get; set; }

        [BsonElement("reservedSpace"), BsonRepresentation(BsonType.ObjectId)]
        public string? ReservedSpace { get; set; }

        [BsonElement("reservedBy"), BsonRepresentation(BsonType.ObjectId)]
        public required string ReservedBy { get; set; }

        [BsonElement("notes"), BsonRepresentation(BsonType.String)]
        public string? Notes { get; set; }
    }
}
