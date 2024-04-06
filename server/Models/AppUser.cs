using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        public string CityName { get; set; }
    }
}