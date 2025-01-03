
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API;

public class UserRepository(DataContext context) : IUserRepository
{
    
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<AppUser> CreateUserAsync(AppUser user)
    {
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task DeleteUserAsync(int id)
    {
         var user = await context.Users.FindAsync(id);
        if (user != null)
        {
            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }
    }

    // As long as that value is greater than zero, that means something has been saved.
    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}