using DeskMateAPI.Data;
using DeskMateAPI.Entities.Enums;
using DeskMateAPI.Entities.RawModels;
using DeskMateAPI.Entities;
using MediatR;
using MongoDB.Driver;

namespace DeskMateAPI.Features.Reservations.GetUserYearlyOverview
{
    public class GetUserYearlyOverviewHandler : IRequestHandler<GetUserYearlyOverviewRequest, GetUserYearlyOverviewResponse>
    {
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly IMongoCollection<Space> _spaces;

        public GetUserYearlyOverviewHandler(MongoDbService mongoDbService)
        {
            if (mongoDbService.Database == null)
            {
                throw new ArgumentNullException(nameof(mongoDbService.Database), "MongoDB Database connection was not initialized.");
            }
            _reservations = mongoDbService.Database.GetCollection<Reservation>("Reservations");
            _spaces = mongoDbService.Database.GetCollection<Space>("Spaces");
        }

        public async Task<GetUserYearlyOverviewResponse> Handle(GetUserYearlyOverviewRequest request, CancellationToken cancellationToken)
        {
            var startOfYear = new DateTime(request.Year.Year, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            var startOfNextYear = startOfYear.AddYears(1);

            var filterBuilder = Builders<Reservation>.Filter;
            var filter = filterBuilder.Eq(r => r.ReservedBy, request.UserId) &
                         filterBuilder.Gte(r => r.Date, startOfYear) &
                         filterBuilder.Lt(r => r.Date, startOfNextYear) &
                         filterBuilder.Ne(r => r.Status, (int)ERequestStatus.Undefined);

            var reservations = await _reservations
                .Find(filter)
                .ToListAsync(cancellationToken);

            var spaces = await _spaces.Find(_ => true).ToListAsync();

            var overviewList = reservations
                .Select(r => new ReservationOverView
                {
                    Id = r.Id!,
                    StartDate = r.Date,
                    EndDate = r.EndDate,
                    Status = r.Status,
                    Label = spaces.FirstOrDefault(s => s.Id == r.ReservedSpace)?.Label,


                })
                .ToList();

            return new GetUserYearlyOverviewResponse(overviewList);
        }
    }
}
