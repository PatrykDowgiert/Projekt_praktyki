using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apka.Data.Models
{
    public class Page
    {
        [Key]
        public int PageId { get; set; }
        public int PageNumber { get; set; }

        public int SurveyId { get; set; }
        [ForeignKey("SurveyId")]
        public virtual Survey Survey { get; set; } = null!;

        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}