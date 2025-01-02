using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

//using primary constructor to inject DataContext
public class UsersController(DataContext context) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
          var users = await context.Users
            .Select(user => new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Avatar = user.Avatar
            })
            .ToListAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")] // e.g. api/users/1
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await context.Users.FindAsync(id);

        if(user ==  null) return NotFound();

        var userDto = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Avatar = user.Avatar
            };

        return Ok(userDto);
    }
}