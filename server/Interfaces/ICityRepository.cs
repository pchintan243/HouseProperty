using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<AppUser>> GetCitiesAsync();

        void AddCity(AppUser appUser);
        void DeleteCity(int cityId);
        Task<AppUser> GetCityByIdAsync(int cityId);
    }
}