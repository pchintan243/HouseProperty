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
            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(
                    d => d.FurnishingType,
                    opt => opt.MapFrom(src => src.FurnishingType.Name)
                );

            CreateMap<Property, PropertyDetailDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(
                    d => d.FurnishingType,
                    opt => opt.MapFrom(src => src.FurnishingType.Name)
                );

            CreateMap<PropertyType, PropertyTypeDto>().ReverseMap();
            CreateMap<FurnishingType, FurnishingTypeDto>().ReverseMap();
            CreateMap<Property, PropertyDto>().ReverseMap();
        }
    }
}
