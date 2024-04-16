using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Interfaces;

namespace server.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _uow;

        public AccountController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User not found");
            }
            var data = await _uow.UserRepository.Login(userDto);

            if (data != null)
            {
                return Ok("Bearer " + data.Token);
            }
            return BadRequest("Credentials are not valid");
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            var isExist = await _uow.UserRepository.UserAlreadyExists(userDto.UserName);

            if (isExist)
            {
                return BadRequest("User already exists");
            }

            var data = await _uow.UserRepository.RegisterUser(userDto);

            await _uow.SaveAsync();
            return Ok(data);
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _uow.UserRepository.GetAllUsers();
            return Ok(users);
        }
    }
}