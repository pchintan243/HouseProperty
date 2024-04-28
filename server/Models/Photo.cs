using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Photo : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public bool IsPrimary { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
        [Required]
        public string PublicId { get; set; }
    }
}