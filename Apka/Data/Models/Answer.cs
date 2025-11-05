using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apka.Data.Models
{
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }

        public string AnswerValue { get; set; } = string.Empty;

        public int ResponseId { get; set; }
        [ForeignKey("ResponseId")]
        public virtual SurveyResponse SurveyResponse { get; set; } = null!;

        public int QuestionId { get; set; } 
        
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; } = null!;
    }
}