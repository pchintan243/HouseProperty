using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class City : BaseEntity
    {
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }

    }
}