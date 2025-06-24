using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DeskMateAPI.Entities.RawModels
{
    public class Space
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public required string Id { get; set; }

        [BsonElement("x"), BsonRepresentation(BsonType.Int32)]
        public int X { get; set; }

        [BsonElement("y"), BsonRepresentation(BsonType.Int32)]
        public int Y { get; set; }

        [BsonElement("type"), BsonRepresentation(BsonType.Int32)]
        public int Type { get; set; }

        [BsonElement("label"), BsonRepresentation(BsonType.String)]
        public required string Label { get; set; }

        [BsonElement("priority"), BsonRepresentation(BsonType.String)]
        public string? Priority { get; set; }

        [BsonElement("spanX"), BsonRepresentation(BsonType.String)]
        public string? SpanX { get; set; }

        [BsonElement("spanY"), BsonRepresentation(BsonType.String)]
        public string? SpanY { get; set; }

    }
}
