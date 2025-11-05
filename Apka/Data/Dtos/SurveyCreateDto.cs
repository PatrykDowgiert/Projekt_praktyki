namespace Apka.Data.Dtos
{
    public class SurveyCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<PageCreateDto> Pages { get; set; } = new List<PageCreateDto>();
    }
}