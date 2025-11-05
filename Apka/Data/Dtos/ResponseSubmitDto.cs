namespace Apka.Data.Dtos
{
    public class ResponseSubmitDto
    {
        public int SurveyId { get; set; }

        public List<AnswerSubmitDto> Answers { get; set; } = new List<AnswerSubmitDto>();
    }
}
