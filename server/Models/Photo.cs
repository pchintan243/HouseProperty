using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Photo : BaseEntity
    {
        [Required]
        public string ImageUrl { get; set; }
        public bool IsPrimary { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}