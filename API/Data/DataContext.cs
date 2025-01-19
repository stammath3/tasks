using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// Contains DbSet properties
public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }

    public DbSet<AppTask> Tasks { get; set; }
}