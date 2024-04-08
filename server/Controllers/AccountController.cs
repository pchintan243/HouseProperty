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
            var data = await _uow.UserRepository.Login(userDto);

            if (data != null)
            {
                return Ok(data);
            }
            return BadRequest("Credentials are not valid");
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
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