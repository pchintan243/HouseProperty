using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        void AddCity(City city);
        void DeleteCity(int cityId);
        Task<City> GetCityByIdAsync(int cityId);
    }
}