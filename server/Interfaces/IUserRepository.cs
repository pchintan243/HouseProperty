using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Login(UserDto userDto);
        Task<User> RegisterUser(UserDto userDto);
        List<User> GetAllUsers();
        Task<bool> UserAlreadyExists(string userName);
    }
}