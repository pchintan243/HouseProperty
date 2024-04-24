using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    public class PropertyTypeController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public PropertyTypeController(IMapper mapper, IUnitOfWork uow)
        {
            _mapper = mapper;
            _uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult> GetPropertyTypes()
        {
            var PropertyTypes = await _uow.PropertyTypeRepository.GetPropertyTypesAsync();
            var PropertyTypesDto = _mapper
                .Map<IEnumerable<PropertyTypeDto>>(PropertyTypes);
            return Ok(PropertyTypesDto);
        }

        [HttpGet]
        public async Task<ActionResult> GetFurnishingTypes()
        {
            var FurnishingTypes = await _uow.PropertyTypeRepository.GetFurnishingTypesAsync();
            var FurnishingTypesDto = _mapper
                .Map<IEnumerable<FurnishingTypeDto>>(FurnishingTypes);
            return Ok(FurnishingTypesDto);
        }

        [HttpPost]
        public async Task<ActionResult> AddPropertyType([FromBody] PropertyTypeDto propertyTypeDto)
        {
            var propertyType = new PropertyType
            {
                Name = propertyTypeDto.Name,
                LastUpdatedBy = propertyTypeDto.LastUpdatedBy
            };
            _uow.PropertyTypeRepository.AddPropertyTypesAsync(propertyType);
            await _uow.SaveAsync();
            return Ok(propertyType);
        }

        [HttpPost]
        public async Task<ActionResult> AddFurnishingType(
            [FromBody] FurnishingTypeDto furnishingTypeDto
        )
        {
            var furnishingType = new FurnishingType
            {
                Name = furnishingTypeDto.Name,
                LastUpdatedBy = furnishingTypeDto.LastUpdatedBy
            };
            _uow.PropertyTypeRepository.AddFurnishingTypesAsync(furnishingType);
            await _uow.SaveAsync();
            return Ok(furnishingType);
        }
    }
}
