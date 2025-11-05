namespace Apka.Data.Dtos
{
    public class PageCreateDto
    {
        public int PageNumber { get; set; }
        public List<QuestionCreateDto> Questions { get; set; } = new List<QuestionCreateDto>();
    }
}