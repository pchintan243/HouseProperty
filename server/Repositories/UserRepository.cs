using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(UserDto userDto)
        {
            var data = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userDto.UserName && x.Password == userDto.Password);
            if (data != null)
            {
                return data;
            }
            return null;
        }

        public List<User> GetAllUsers()
        {
            var listOfUsers = _context.Users.ToList();

            return listOfUsers;
        }

        public async Task<User> RegisterUser(UserDto userDto)
        {
            var data = new User()
            {
                UserName = userDto.UserName,
                Password = userDto.Password
            };

            // if (_context.Users.Where(x => x.UserName.ToLower() == userDto.UserName.ToLower()).Any())
            // {
            //     return null;
            // }

            _context.Users.Add(data);
            return data;
        }
    }
}