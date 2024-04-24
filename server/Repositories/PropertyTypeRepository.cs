using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext _context;

        public PropertyTypeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await _context.PropertyTypes.ToListAsync();
        }

        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            return await _context.FurnishingTypes.ToListAsync();
        }

        public void AddPropertyTypesAsync(PropertyType propertyType)
        {
            _context.PropertyTypes.Add(propertyType);
        }

        public void AddFurnishingTypesAsync(FurnishingType furnishingType)
        {
            _context.FurnishingTypes.Add(furnishingType);
        }
    }
}
