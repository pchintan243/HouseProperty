using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PropertyController(IUnitOfWork uow, DataContext context, IMapper mapper)
        {
            _uow = uow;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{sellRent}")]
        public async Task<IActionResult> GetProperties(int sellRent)
        {
            var ListOfProperties = await _uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyList = _mapper.Map<IEnumerable<PropertyListDto>>(ListOfProperties);
            return Ok(propertyList);
        }

        [HttpPost]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var data = _mapper.Map<Property>(propertyDto);

            var userId = GetUserId();
            data.PostedBy = userId;
            data.LastUpdatedBy = userId;
            _uow.PropertyRepository.AddProperty(data);
            await _uow.SaveAsync();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await _uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDetail = _mapper.Map<PropertyDetailDto>(property);
            return Ok(propertyDetail);
        }
    }
}
