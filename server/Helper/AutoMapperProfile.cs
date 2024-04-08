using AutoMapper;
using server.Dtos;
using server.Models;

namespace server.Helper
{
    /// <summary>
    /// Mapping Profile
    /// </summary>
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser, CityDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}