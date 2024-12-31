using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/users
//[controller] is a token that will be replaced by the name of the controller, in this case, Users (anything before the word "Controller")

//using primary constructor to inject DataContext
public class TasksController(DataContext context) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppTask>>> GetUsers()
    {
        var tasks = await context.Tasks.ToListAsync();

        return tasks;
    }

    [HttpGet("{id:int}")] // e.g. api/tasks/1
    public async Task<ActionResult<AppTask>> GetUser(int id)
    {
        var task = await context.Tasks.FindAsync(id);

        if(task ==  null) return NotFound();

        return task;
    }
}