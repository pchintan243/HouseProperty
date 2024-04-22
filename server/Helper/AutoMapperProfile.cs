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
            CreateMap<City, CityDto>().ReverseMap();
        }
    }
}