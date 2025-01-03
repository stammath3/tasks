using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//using primary constructor to inject DataContext
public class TasksController(ITaskRepository taskRepository) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
       var tasks = await taskRepository.GetAllTasksAsync();

        var taskDtos = tasks.Select(task => new TaskDto
        {
            Id = task.Id,
            UserId = task.AppUserId,
            Title = task.Title,
            Summary = task.Summary,
            DueDate = task.DueDate
        });

        return Ok(taskDtos);
    }

    [HttpGet("{id:int}")] // e.g. api/tasks/1
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
       var task = await taskRepository.GetTaskByIdAsync(id);

        if (task == null) return NotFound();

        var taskDto = new TaskDto
        {
            Id = task.Id,
            UserId = task.AppUserId,
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
            AppUserId = taskDto.UserId,
            Title = taskDto.Title,
            Summary = taskDto.Summary,
            DueDate = taskDto.DueDate
        };

        var createdTask = await taskRepository.CreateTaskAsync(task);

        taskDto.Id = createdTask.Id;

        return CreatedAtAction(nameof(GetTask), new { id = taskDto.Id }, taskDto);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
       var task = await taskRepository.GetTaskByIdAsync(id);
        if (task == null) return NotFound();

        await taskRepository.DeleteTaskAsync(id);

        return NoContent();
    }
}