using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class BaseEntity
    {
        public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
        public int LastUpdatedBy { get; set; }
    }
}
