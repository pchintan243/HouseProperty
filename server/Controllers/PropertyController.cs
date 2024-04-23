using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
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
            var propertyList = _mapper.Map<IEnumerable<PropertyDto>>(ListOfProperties);
            return Ok(propertyList);
        }

        [HttpPost]
        public async Task<IActionResult> AddProperty([FromBody] PropertyDto propertyDto)
        {
            var data = new Property
            {
                SellRent = propertyDto.SellRent,
                Name = propertyDto.Name,
                Price = propertyDto.Price,
                BHK = propertyDto.BHK,
                BuiltArea = propertyDto.BuiltArea,
                ReadyToMove = propertyDto.ReadyToMove,
                CarpetArea = propertyDto.CarpetArea,
                Address = propertyDto.Address,
                Address2 = propertyDto.Address2,
                FloorNo = propertyDto.FloorNo,
                TotalFloors = propertyDto.TotalFloors,
                MainEntrance = propertyDto.MainEntrance,
                Security = propertyDto.Security,
                Gated = propertyDto.Gated,
                Maintenance = propertyDto.Maintenance,
                EstPossessionOn = propertyDto.EstPossessionOn,
                Age = propertyDto.Age,
                Description = propertyDto.Description,
                PostedBy = propertyDto.PostedBy
            };
            _uow.PropertyRepository.AddProperty(data);
            await _context.SaveChangesAsync();
            return Ok(data);
        }
    }
}
