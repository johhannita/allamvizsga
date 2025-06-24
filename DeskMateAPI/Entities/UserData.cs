using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DeskMateAPI.Entities
{
    public class UserData
    {
        public string? Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Team { get; set; }

        public UserData(string id, string firstName, string lastName, string email)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
        }

        public UserData(string id, string firstName, string lastName, string email, string? team)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Team = team;
        }
    }
}
