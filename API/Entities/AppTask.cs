using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class AppTask
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

        //Navigation properties
        public int AppUserId { get; set; } // Foreign key to AppUser table

        public AppUser AppUser { get; set; } =  null!; 

}
