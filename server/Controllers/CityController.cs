using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext _context;

        public CityController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetCities()
        {
            return Ok(_context.Cities.ToList());
        }
        [HttpPost]
        public async Task<IActionResult> AddCity([FromBody] City city)
        {
            var data = new AppUser()
            {
                CityName = city.CityName
            };
            await _context.Cities.AddAsync(data);
            await _context.SaveChangesAsync();
            return Ok(data);
        }
    }
}
