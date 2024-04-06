using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ICityRepository _cityRepository;

        public CityController(DataContext context, ICityRepository cityRepository)
        {
            _context = context;
            _cityRepository = cityRepository;
        }

        /// <summary>
        /// Get All the cities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {   
            var listOfCities = await _cityRepository.GetCitiesAsync();
            return Ok(listOfCities);
        }

        /// <summary>
        /// Add a new city
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddCity([FromBody] City city)
        {
            var data = new AppUser()
            {
                CityName = city.CityName
            };
            var listOfCities = await _context.Cities.Select(x => x.CityName).ToListAsync();
            if (city.CityName != null && !listOfCities.Contains(city.CityName.ToLower()))
            {
                _cityRepository.AddCity(data);
                await _cityRepository.SaveAsync();
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
                _cityRepository.DeleteCity(id);
                await _cityRepository.SaveAsync();
                return Ok("City Deleted successfully");
            }
            return BadRequest("City with given id is Not Found");
        }
    }
}
