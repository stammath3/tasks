
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API;

public class TaskRepository(DataContext context) : ITaskRepository
{
    public async Task<IEnumerable<AppTask>> GetAllTasksAsync()
    {
        return await context.Tasks.ToListAsync();
    }

    public async Task<AppTask?> GetTaskByIdAsync(int id)
    {
        return await context.Tasks.FindAsync(id);
    }

    public async Task<AppTask> CreateTaskAsync(AppTask task)
    {
        context.Tasks.Add(task);
        await context.SaveChangesAsync();
        return task;
    }

    public async Task DeleteTaskAsync(int id)
    {
        var task = await context.Tasks.FindAsync(id);
        if (task != null)
        {
            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
        }
    }

     // As long as that value is greater than zero, that means something has been saved.
    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}