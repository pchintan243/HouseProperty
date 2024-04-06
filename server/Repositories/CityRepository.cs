using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;

        public CityRepository(DataContext context)
        {
            _context = context;
        }
        public void AddCity(AppUser city)
        {
            _context.Cities.Add(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = _context.Cities.Find(cityId);
            _context.Cities.Remove(city);
        }

        public async Task<IEnumerable<AppUser>> GetCitiesAsync()
        {
            return await _context.Cities.ToListAsync();
        }
    }
}