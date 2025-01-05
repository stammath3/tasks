using API.Entities;

namespace API;

public interface ITaskRepository
{
    Task<IEnumerable<AppTask>> GetAllTasksAsync();
    Task<AppTask?> GetTaskByIdAsync(int id);
    Task<AppTask> CreateTaskAsync(AppTask task);
    Task DeleteTaskAsync(int id);

}