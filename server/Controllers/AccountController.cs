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
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("User not found");
            }
            var data = await _uow.UserRepository.Login(loginDto);

            if (data != null)
            {
                return Ok(data);
            }
            return BadRequest("Credentials are not valid");
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            var isExist = await _uow.UserRepository.UserAlreadyExists(userDto.Email);

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