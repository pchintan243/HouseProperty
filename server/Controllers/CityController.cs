using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CityController(DataContext context, IUnitOfWork uow, IMapper mapper)
        {
            _context = context;
            _uow = uow;
            _mapper = mapper;
        }

        /// <summary>
        /// Get All the cities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var listOfCities = await _uow.CityRepository.GetCitiesAsync();
            return Ok(listOfCities.Reverse());
        }

        /// <summary>
        /// Add a new city
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddCity([FromBody] CityDto cityDto)
        {
            var data = new AppUser()
            {
                CityName = cityDto.CityName,
                LastUpdatedBy = cityDto.LastUpdatedBy
            };
            var listOfCities = await _context.Cities.Select(x => x.CityName).ToListAsync();
            if (cityDto.CityName != null && !listOfCities.Contains(cityDto.CityName.ToLower()))
            {
                _uow.CityRepository.AddCity(data);
                await _uow.SaveAsync();
                return Ok(data);
            }
            return BadRequest("City was already added");
        }

        /// <summary>
        /// Delete Particular City 
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city != null)
            {
                _uow.CityRepository.DeleteCity(id);
                await _uow.SaveAsync();
                return Ok("City Deleted successfully");
            }
            return BadRequest("City with given id is Not Found");
        }
    }
}
