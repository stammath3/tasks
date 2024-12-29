using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/users
//[controller] is a token that will be replaced by the name of the controller, in this case, Users (anything before the word "Controller")

//using primary constructor to inject DataContext
public class UsersController(DataContext context) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return users;
    }

    [HttpGet("{id:int}")] // e.g. api/users/1
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await context.Users.FindAsync(id);

        if(user ==  null) return NotFound();

        return user;
    }
}