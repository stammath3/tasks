using API.Data;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//using primary constructor to inject DataContext
public class TasksController(ITaskRepository taskRepository, IMapper mapper) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await taskRepository.GetAllTasksAsync();
        var taskDtos = mapper.Map<IEnumerable<TaskDto>>(tasks);

        return Ok(taskDtos);
    }

    [HttpGet("{id:int}")] // e.g. api/tasks/1
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
        var task = await taskRepository.GetTaskByIdAsync(id);

        if (task == null) return NotFound();

        var taskDto = mapper.Map<IEnumerable<TaskDto>>(task);

        return Ok(taskDto);
    }


    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto)
    {
       
        var task = mapper.Map<AppTask>(taskDto);
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