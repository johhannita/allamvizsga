using DeskMateAPI.Features.Reservations.GetAllReservations;
using DeskMateAPI.Features.Reservations.GetAllSpaces;
using DeskMateAPI.Features.Reservations.GetHomeOffice;
using DeskMateAPI.Features.Reservations.GetReservations;
using DeskMateAPI.Features.Reservations.GetSpacesForReservation;
using DeskMateAPI.Features.Reservations.GetUserYearlyOverview;
using DeskMateAPI.Features.Reservations.ModifyReservationStatus;
using DeskMateAPI.Features.Reservations.ReserveHomeOffice;
using DeskMateAPI.Features.Reservations.ReserveSpace;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DeskMateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReservationController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ReservationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[Authorize(Roles = "user")]
        //[HttpGet]
        //public async Task<IActionResult> GetAllSpaces(CancellationToken cancellationToken)
        //{
        //    var response = await _mediator.Send(new GetAllSpacesRequest(), cancellationToken);
        //    return Ok(response);
        //}

        [Authorize]
        [HttpPost("GetSpacesForReservation")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetSpacesForReservation([FromBody] GetSpacesForReservationRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("ReserveSpace")]
        [Consumes("application/json")]
        public async Task<IActionResult> ReserveSpace([FromBody] ReserveSpaceRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("GetReservations")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetReservations([FromBody] GetReservationsRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("ModifyReservationStatus")]
        [Consumes("application/json")]
        public async Task<IActionResult> ModifyReservationStatus([FromBody] ModifyReservationStatusRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("ReserveHomeOffice")]
        [Consumes("application/json")]
        public async Task<IActionResult> ReserveHomeOffice([FromBody] ReserveHomeOfficeRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("GetHomeOffice")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetHomeOffice([FromBody] GetHomeOfficeRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("GetUserYearlyOverview")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetUserYearlyOverview([FromBody] GetUserYearlyOverviewRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("GetAllReservations")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetAllReservations([FromBody] GetAllReservationsRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

    }
}