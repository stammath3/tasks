using System;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }

    public required string UserName { get; set; }

     // Store the avatar as binary data
     public byte[]? Avatar { get; set; }

}
