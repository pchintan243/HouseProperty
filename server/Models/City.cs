using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class City : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }
    }
}
