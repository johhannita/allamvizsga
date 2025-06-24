using MongoDB.Bson;

namespace DeskMateAPI.Utils
{
    public static class MongoUtils
    {
        public static bool IsValidObjectId(string id)
        {
            return ObjectId.TryParse(id, out _);
        }
    }
}
