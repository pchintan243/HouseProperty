using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordKey { get; set; }
        public string? Token { get; set; }
    }
}