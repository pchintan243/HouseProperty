using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class FurnishingType : BaseEntity
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
