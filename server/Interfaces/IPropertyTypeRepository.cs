using server.Dtos;
using server.Models;

namespace server.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypesAsync();
        void AddPropertyTypesAsync(PropertyType propertyType);
        Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync();
        void AddFurnishingTypesAsync(FurnishingType furnishingType);
    }
}
