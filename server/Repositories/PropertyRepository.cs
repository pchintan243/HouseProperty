using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext _context;

        public PropertyRepository(DataContext context)
        {
            _context = context;
        }

        public void AddProperty(Property property)
        {
            _context.Properties.Add(property);
        }

        public void DeleteProperty(int id)
        {
            var data = _context.Properties.Where(x => x.Id == id).FirstOrDefault();
            if (data != null)
            {
                _context.Properties.Remove(data);
            }
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
            var ListOfProperties = await _context
                .Properties.Include(x => x.PropertyType)
                .Include(x => x.City)
                .Include(x => x.FurnishingType)
                .Where(x => x.SellRent == sellRent || x.Id == sellRent)
                .ToListAsync();

            return ListOfProperties;
        }

        public async Task<Property> GetPropertyDetailAsync(int id)
        {
            var property = await _context
                .Properties.Include(x => x.PropertyType)
                .Include(x => x.City)
                .Include(x => x.FurnishingType)
                .Where(x => x.Id == id)
                .FirstAsync();

            return property;
        }
    }
}
