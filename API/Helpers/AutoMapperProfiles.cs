

using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, UserDto>().ReverseMap();
        // .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar ?? "default.jpg"))
        // .ReverseMap();

        CreateMap<AppTask, TaskDto>().ReverseMap();
    }
}