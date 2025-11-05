using Apka.Data.Models;

namespace Apka.Data.Dtos
{
    public class QuestionCreateDto
    {
        public string QuestionText { get; set; } = string.Empty;
        public QuestionType QuestionType { get; set; }
        public int QuestionOrder { get; set; }
    }
}