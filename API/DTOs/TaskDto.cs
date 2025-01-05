using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class TaskDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public required string Title { get; set; }

    [MaxLength(1000)]
    public string? Summary { get; set; }

    [Required]
    [MaxLength(50)]
    public required string DueDate { get; set; }

    public int AppUserId { get; set; }
}
