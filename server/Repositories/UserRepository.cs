using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public static IConfiguration _configuration;

        public UserRepository(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<User> Login(UserDto userDto)
        {
            var data = await _context.Users.SingleOrDefaultAsync(x => x.UserName == userDto.UserName && x.Password == userDto.Password);
            if (data != null)
            {
                data.Token = CreateJWT(data);
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
                Password = userDto.Password,
            };

            // if (_context.Users.Where(x => x.UserName.ToLower() == userDto.UserName.ToLower()).Any())
            // {
            //     return null;
            // }

            _context.Users.Add(data);
            return data;
        }

        private static string CreateJWT(User user)
        {
            var secretKey = _configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha512Signature
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}