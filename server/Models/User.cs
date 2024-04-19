using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordKey { get; set; }
        public string? Token { get; set; }
    }
}