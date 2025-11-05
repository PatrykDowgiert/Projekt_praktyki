namespace Apka.Data.Dtos
{
    public class AnswerSubmitDto
    {
        public int QuestionId { get; set; }
        
        public string AnswerValue { get; set; } = string.Empty;
    }
}