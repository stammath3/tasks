using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

//using primary constructor to inject DataContext
public class TasksController(DataContext context) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await context.Tasks.Select(task => new TaskDto
        {
            Id = task.Id,
            UserId = task.UserId,
            Title = task.Title,
            Summary = task.Summary,
            DueDate = task.DueDate
        }).ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id:int}")] // e.g. api/tasks/1
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
        var task = await context.Tasks.FindAsync(id);

        if(task ==  null) return NotFound();

        var taskDto = new TaskDto
            {
                Id = task.Id,
                UserId = task.UserId,
                Title = task.Title,
                Summary = task.Summary,
                DueDate = task.DueDate
            };

        return Ok(taskDto);
    }


    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto)
    {
       var task = new AppTask
        {
            UserId = taskDto.UserId,
            Title = taskDto.Title,
            Summary = taskDto.Summary,
            DueDate = taskDto.DueDate
        };

        // Add the task to the database
        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        // Set the id of the taskDto to the id of the task
        taskDto.Id = task.Id;

        // Return the created task with a 201 Created status
        return CreatedAtAction(nameof(GetTask), new { id = taskDto.Id }, taskDto);
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