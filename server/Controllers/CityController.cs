﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CityController(DataContext context, IUnitOfWork uow, IMapper mapper)
        {
            _context = context;
            _uow = uow;
            _mapper = mapper;
        }

        /// <summary>
        /// Get All the cities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var listOfCities = await _uow.CityRepository.GetCitiesAsync();
            return Ok(listOfCities);
        }

        /// <summary>
        /// Get count of Number of cities
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetCityCount()
        {
            // var listOfCities = _uow.CityRepository.GetCitiesAsync();
            IEnumerable<City> listOfCities = await _uow.CityRepository.GetCitiesAsync();
            int cityCount = listOfCities.Count();

            return Ok(new { Count = cityCount });
        }

        /// <summary>
        /// Add a new city
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddCity([FromBody] CityDto cityDto)
        {
            var city = new City();
            // var data = new AppUser()
            // {
            //     CityName = cityDto.CityName,
            //     LastUpdatedBy = cityDto.LastUpdatedBy
            // };
            var data = _mapper.Map(cityDto, city);

            var listOfCities = await _context.Cities.Select(x => x.Name).ToListAsync();
            if (cityDto.Name != null && !listOfCities.Contains(cityDto.Name.ToLower()))
            {
                _uow.CityRepository.AddCity(data);
                await _uow.SaveAsync();
                return Ok(data);
            }
            return BadRequest("City was already added");
        }

        /// <summary>
        /// Update city
        /// </summary>
        /// <param name="cityId"></param>
        /// <returns></returns>
        [HttpPut("{cityId}")]
        public async Task<IActionResult> UpdateCity(int cityId, CityDto cityDto)
        {
            var city = await _uow.CityRepository.GetCityByIdAsync(cityId);

            var listOfCities = await _context.Cities.Select(x => x.Name).ToListAsync();

            if (city != null)
            {
                // city.CityName = cityDto.CityName;
                // city.LastUpdatedBy = cityDto.LastUpdatedBy;
                _mapper.Map(cityDto, city);
                if (listOfCities.Contains(cityDto.Name.ToLower()))
                {
                    return BadRequest("City is already in the list of cities");
                }
                await _uow.SaveAsync();
                return Ok(city);
            }
            return BadRequest("City with given id is Not Found");
        }

        /// <summary>
        /// Delete Particular Cit
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city != null)
            {
                _uow.CityRepository.DeleteCity(id);
                await _uow.SaveAsync();
                return Ok("City Deleted successfully");
            }
            return BadRequest("City with given id is Not Found");
        }
    }
}
