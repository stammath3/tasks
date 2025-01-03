using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//using primary constructor to inject DataContext
public class UsersController(IUserRepository userRepository) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await userRepository.GetUsersAsync();

          var userDtos = users.Select(user => new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Avatar = user.Avatar
        });

        return Ok(userDtos);
    }

    [HttpGet("{id:int}")] // e.g. api/users/1
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
         var user = await userRepository.GetUserByIdAsync(id);

        if (user == null) return NotFound();

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
         var user = new AppUser
        {
            UserName = userDto.UserName,
            Avatar = userDto.Avatar
        };

        var createdUser = await userRepository.CreateUserAsync(user);

        userDto.Id = createdUser.Id;

        return CreatedAtAction(nameof(GetUser), new { id = userDto.Id }, userDto);
    }

    // Delete a user
    //It will automatically delete all tasks associated with the user with cascade delete
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
       var user = await userRepository.GetUserByIdAsync(id);
        if (user == null) return NotFound();

        await userRepository.DeleteUserAsync(id);

        return NoContent();
    }
}