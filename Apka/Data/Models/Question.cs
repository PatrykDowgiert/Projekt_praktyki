using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apka.Data.Models
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }

        [Required]
        public string QuestionText { get; set; } = string.Empty;
        public int QuestionOrder { get; set; }

        [Required]
        public QuestionType QuestionType { get; set; }
        public int? MaxLength { get; set; }

        public int PageId { get; set; }
        [ForeignKey("PageId")]
        public virtual Page Page { get; set; } = null!;

        public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}