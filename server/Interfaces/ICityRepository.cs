using server.Models;

namespace server.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<AppUser>> GetCitiesAsync();

        void AddCity(AppUser city);
        void DeleteCity(int cityId);
    }
}