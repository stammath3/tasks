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

    // Create a new user
    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(UserDto userDto)
    {
        // Map UserDto to AppUser
        var user = new AppUser
        {
            UserName = userDto.UserName,
            Avatar = userDto.Avatar
        };

        // Add the new user to the database
        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Set the ID for the DTO
        userDto.Id = user.Id;

        // Return the created user along with a 201 Created status
        return CreatedAtAction(nameof(GetUser), new { id = userDto.Id }, userDto);
    }

    // Delete a user
    //It will automatically delete all tasks associated with the user with cascade delete
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        // Find the user by ID
        var user = await context.Users.FindAsync(id);

        if (user == null) return NotFound();

        // // Find all tasks associated with this user by UserId
        // var tasks = await context.Tasks.Where(t => t.UserId == id).ToListAsync();

        // // Remove all tasks associated with the user
        // context.Tasks.RemoveRange(tasks); 

        // Remove the user
        context.Users.Remove(user);

        // Save changes to the database
        await context.SaveChangesAsync();

        // Return a successful response (No Content)
        return NoContent();
    }
}