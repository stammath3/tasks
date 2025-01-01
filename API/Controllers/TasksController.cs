using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // api/tasks
//[controller] is a token that will be replaced by the name of the controller, in this case, Tasks (anything before the word "Controller")

//using primary constructor to inject DataContext
public class TasksController(DataContext context) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppTask>>> GetTasks()
    {
        var tasks = await context.Tasks.ToListAsync();

        return tasks;
    }

    [HttpGet("{id:int}")] // e.g. api/tasks/1
    public async Task<ActionResult<AppTask>> GetTask(int id)
    {
        var task = await context.Tasks.FindAsync(id);

        if(task ==  null) return NotFound();

        return task;
    }


    [HttpPost]
    public async Task<ActionResult<AppTask>> CreateTask(AppTask task)
    {
        // Add the task to the database
        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        // Return the created task with a 201 Created status
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await context.Tasks.FindAsync(id);

        if (task == null) return NotFound();

        // Remove the task from the database
        context.Tasks.Remove(task);
        await context.SaveChangesAsync();

        // Return a 204 No Content status
        return NoContent();
    }
}