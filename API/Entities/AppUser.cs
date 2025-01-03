using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string UserName { get; set; }

    // Store the file path or URL to the avatar image
    [MaxLength(1000)]
    public string? Avatar { get; set; }

    // Collection navigation containing dependents
    public ICollection<AppTask> Tasks { get; set; } = new List<AppTask>();
}
