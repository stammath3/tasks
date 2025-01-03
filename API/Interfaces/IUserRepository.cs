using API.Entities;

namespace API;

public interface IUserRepository
{
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(int id);
    Task<AppUser> CreateUserAsync(AppUser user);

    Task DeleteUserAsync(int id);
    Task<bool> SaveAllAsync();

}