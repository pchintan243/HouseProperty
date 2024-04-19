using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<User> Login(LoginDto loginDto)
        {
            var data = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
            if (data == null)
            {
                return null;
            }
            data.Token = CreateJWT(data);

            if (!PasswordMatchHash(loginDto.Password, data.PasswordHash, data.PasswordKey))
                return null;
            return data;
        }

        private bool PasswordMatchHash(string password, byte[] passwordHash, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var HashPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < HashPassword.Length; i++)
                {
                    if (HashPassword[i] != passwordHash[i])
                        return false;
                }
                return true;
            }
        }

        public List<User> GetAllUsers()
        {
            var listOfUsers = _context.Users.ToList();

            return listOfUsers;
        }

        public async Task<User> RegisterUser(UserDto userDto)
        {
            byte[] passwordHash, passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
            }

            var data = new User
            {
                UserName = userDto.UserName,
                PasswordHash = passwordHash,
                PasswordKey = passwordKey,
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber
            };

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

        public async Task<bool> UserAlreadyExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }
    }
}