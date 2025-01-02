using System.ComponentModel.DataAnnotations;

namespace API;

public class TaskDto
{
    public int Id { get; set; }

    [Required]
    public required int UserId { get; set; } // Foreign key to AppUser table

    [Required]
    [MaxLength(200)]
    public required string Title { get; set; }

    [MaxLength(1000)]
    public string? Summary { get; set; }

    [Required]
    [MaxLength(50)]
    public required string DueDate { get; set; }
}
