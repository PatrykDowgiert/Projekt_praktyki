// W pliku: Apka/Dtos/SurveyResultDto.cs (lub Apka/Data/Dtos/SurveyResultDto.cs)
namespace Apka.Dtos;
// lub 'namespace Apka.Data.Dtos;'

// To będzie reprezentować JEDNO pytanie i WSZYSTKIE odpowiedzi na nie
public class QuestionResultDto
{
    public int QuestionId { get; set; }
    public string QuestionText { get; set; }
    public List<string> Answers { get; set; } = new List<string>();
}

// To jest główny obiekt, który zwrócimy
public class SurveyResultDto
{
    public int SurveyId { get; set; }
    public string SurveyTitle { get; set; }
    
    // Lista pytań (wraz z ich odpowiedziami)
    public List<QuestionResultDto> Questions { get; set; } = new List<QuestionResultDto>();
}