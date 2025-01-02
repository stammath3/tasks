using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")]
//[controller] is a token that will be replaced by the name of the controller, in this case, Tasks (anything before the word "Controller")
public class BaseApiController : ControllerBase
{

}