using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;

        /// <summary>
        /// Constructor to initialize the instance
        /// </summary>
        /// <param name="context"></param>
        public CityRepository(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Create a city
        /// </summary>
        /// <param name="city"></param>
        public void AddCity(AppUser city)
        {
            _context.Cities.Add(city);
        }

        /// <summary>
        /// Delete a particular city
        /// </summary>
        /// <param name="cityId"></param>
        public void DeleteCity(int cityId)
        {
            var city = _context.Cities.Find(cityId);
            if (city != null)
            {
                _context.Cities.Remove(city);
            }
        }

        /// <summary>
        /// Get All the cities
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<AppUser>> GetCitiesAsync()
        {
            return await _context.Cities.ToListAsync();
        }

        /// <summary>
        /// Get City By Id
        /// </summary>
        /// <param name="cityId"></param>
        /// <returns></returns>
        public async Task<AppUser> GetCityByIdAsync(int cityId)
        {
            var city = await _context.Cities.FindAsync(cityId);
            if (city != null)
            {
                return city;
            }
            return null;
        }
    }
}