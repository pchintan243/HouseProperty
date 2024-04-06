using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        public string CityName { get; set; }
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
        public int LastUpdatedBy { get; set; }
    }
}