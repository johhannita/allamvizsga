using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DeskMateAPI.Entities.RawModels
{
    public class User
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public required string Id { get; set; }

        [BsonElement("firstName"), BsonRepresentation(BsonType.String)]
        public required string FirstName { get; set; }

        [BsonElement("lastName"), BsonRepresentation(BsonType.String)]
        public required string LastName { get; set; }

        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public required string Email { get; set; }

        [BsonElement("password"), BsonRepresentation(BsonType.String)]
        public required string Password { get; set; }

        [BsonElement("role"), BsonRepresentation(BsonType.String)]
        public required string Role { get; set; }

        [BsonElement("team"), BsonRepresentation(BsonType.String)]
        public string? Team { get; set; }
    }
}
