using DeskMateAPI.Features.Auth;
using DeskMateAPI.Features.GetAllUsers;
using DeskMateAPI.Features.GetUserData;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DeskMateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetAllUsersRequest(), cancellationToken);
            return Ok(response);
        }

        [HttpPost("Login")]
        [Consumes("application/json")]
        public async Task<IActionResult> Login([FromBody] AuthRequest request, CancellationToken cancellationToken)
        {
            var token = await _mediator.Send(request, cancellationToken);
            return Ok(token);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("GetUserData")]
        [Consumes("application/json")]
        public async Task<IActionResult> Login([FromBody] GetUserDataRequest request, CancellationToken cancellationToken)
        {
            var token = await _mediator.Send(request, cancellationToken);
            return Ok(token);
        }

    }
}
