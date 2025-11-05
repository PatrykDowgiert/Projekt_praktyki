using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apka.Data.Models
{
    public class SurveyResponse
    {
        [Key]
        public int ResponseId { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        public int SurveyId { get; set; }
        [ForeignKey("SurveyId")]

        public virtual Survey Survey { get; set; } = null!;

        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}
