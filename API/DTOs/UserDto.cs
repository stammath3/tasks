using System.ComponentModel.DataAnnotations;

namespace API;

public class UserDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string UserName { get; set; }

    [MaxLength(1000)]
    public string? Avatar { get; set; }
}