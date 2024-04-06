using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext _context;

        public CityController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get All the cities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            List<AppUser> listOfCities = await _context.Cities.ToListAsync();
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
                await _context.Cities.AddAsync(data);
                await _context.SaveChangesAsync();
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
                _context.Cities.Remove(city);
                await _context.SaveChangesAsync();
                return Ok("City Deleted successfully");
            }
            return BadRequest("City with given id is Not Found");
        }
    }
}
