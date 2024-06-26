using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public PropertyController(IUnitOfWork uow, DataContext context, IMapper mapper, IPhotoService photoService)
        {
            _uow = uow;
            _context = context;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("{sellRent}")]
        public async Task<IActionResult> GetProperties(int sellRent)
        {
            var ListOfProperties = await _uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyList = _mapper.Map<IEnumerable<PropertyListDto>>(ListOfProperties).OrderByDescending(x => x.Id);
            return Ok(propertyList);
        }

        [HttpPost]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var data = _mapper.Map<Property>(propertyDto);

            var userId = GetUserId();
            data.PostedBy = userId;
            data.LastUpdatedBy = userId;
            _uow.PropertyRepository.AddProperty(data);
            await _uow.SaveAsync();
            return Ok(data);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<PhotoDto>> AddPropertyPhoto(IFormFile formFile, int id)
        {
            var userId = GetUserId();
            var property = await _uow.PropertyRepository.GetPropertyByIdAsync(id);

            if (property.PostedBy != userId)
                return BadRequest("You are not authorized to upload photo for this property.");

            var result = await _photoService.UploadPhotoAsync(formFile);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (property.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }

            property.Photos.Add(photo);
            await _uow.SaveAsync();
            return _mapper.Map<PhotoDto>(photo);            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await _uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDetail = _mapper.Map<PropertyDetailDto>(property);
            return Ok(propertyDetail);
        }

        [HttpPost("{id}/{photoPublicId}")]
        public async Task<IActionResult> SetPrimaryPhoto(int id, string photoPublicId)
        {
            var userId = GetUserId();

            var property = await _uow.PropertyRepository.GetPropertyByIdAsync(id);

            if (property == null)
            {
                return BadRequest("Property with given id does not exist");
            }

            if (property.PostedBy != userId)
            {
                return BadRequest("You are not authorized to change the photo");
            }

            var photo = property.Photos.FirstOrDefault(x => x.PublicId == photoPublicId);

            if (photo == null)
            {
                return BadRequest("No such property or photo exists");
            }

            if (photo.IsPrimary)
            {
                return BadRequest("Photo is already set as primary");
            }

            var currentPrimary = property.Photos.FirstOrDefault(p => p.IsPrimary);

            if (currentPrimary != null)
            {
                currentPrimary.IsPrimary = false;
                photo.IsPrimary = true;
            }

            if (await _uow.SaveAsync())
                return NoContent();
            return BadRequest("Failed to set photo as primary");

        }
        [HttpDelete("{id}/{photoPublicId}")]
        public async Task<IActionResult> DeletePhoto(int id, string photoPublicId)
        {
            var userId = GetUserId();

            var property = await _uow.PropertyRepository.GetPropertyByIdAsync(id);

            if (property == null)
            {
                return BadRequest("Property with given id does not exist");
            }

            if (property.PostedBy != userId)
            {
                return BadRequest("You are not authorized to delete the photo");
            }

            var photo = property.Photos.FirstOrDefault(x => x.PublicId == photoPublicId);

            if (photo == null)
            {
                return BadRequest("No such property or photo exists");
            }

            if (photo.IsPrimary)
            {
                return BadRequest("You cannot delete a primary photo");
            }

            var result = await _photoService.DeletePhotoAsync(photo.PublicId);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            property.Photos.Remove(photo);

            if (await _uow.SaveAsync())
                return Ok();
            return BadRequest("Failed to delete a photo");

        }

    }
}
