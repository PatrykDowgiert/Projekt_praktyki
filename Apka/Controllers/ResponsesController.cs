// W pliku: Apka/Controllers/ResponsesController.cs

using Apka.Data;
using Apka.Data.Dtos;
using Apka.Data.Models;
using Microsoft.AspNetCore.Mvc;

// --- DODAJ TE DWA USING ---
using Microsoft.EntityFrameworkCore; 
using Apka.Dtos; // lub 'Apka.Data.Dtos', jeśli tam dałeś SurveyResultDto

namespace Apka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponsesController : ControllerBase
    {
        private readonly SurveyDbContext _context;

        public ResponsesController(SurveyDbContext context)
        {
            _context = context;
        }

        // --- TWOJA METODA (ZOSTAJE BEZ ZMIAN) ---
        [HttpPost]
        public async Task<IActionResult> SubmitResponse([FromBody] ResponseSubmitDto responseDto)
        {
            // ... CAŁY TWÓJ KOD ZAPISYWANIA ...
            // ... (zostaje tak jak jest) ...
            var newResponse = new SurveyResponse
            {
                SurveyId = responseDto.SurveyId,
                SubmittedAt = DateTime.UtcNow,
                Answers = new List<Answer>() 
            };
            foreach (var answerDto in responseDto.Answers)
            {
                var newAnswer = new Answer
                {
                    QuestionId = answerDto.QuestionId,
                    AnswerValue = answerDto.AnswerValue
                };
                newResponse.Answers.Add(newAnswer);
            }
            _context.SurveyResponses.Add(newResponse);
            await _context.SaveChangesAsync();
            return StatusCode(201); 
        }

        // --- DODAJ TĘ NOWĄ METODĘ PONIŻEJ ---
        // GET: api/responses/5
        [HttpGet("{surveyId}")]
        public async Task<ActionResult<SurveyResultDto>> GetSurveyResults(int surveyId)
        {
            // 1. Znajdź ankietę i jej pytania (tak jak planowaliśmy)
            var survey = await _context.Surveys
                .Include(s => s.Pages)
                .ThenInclude(p => p.Questions)
                .FirstOrDefaultAsync(s => s.SurveyId == surveyId);

            if (survey == null)
            {
                return NotFound("Nie znaleziono ankiety.");
            }

            var resultDto = new SurveyResultDto
            {
                SurveyId = survey.SurveyId,
                SurveyTitle = survey.Title
            };

            // 2. Pobierz WSZYSTKIE odpowiedzi dla tej ankiety
            //    (Ta logika pasuje do Twojego modelu zapisu)
            var allAnswers = await _context.SurveyResponses // 1. Zacznij od SurveyResponses
                .Where(r => r.SurveyId == surveyId)          // 2. Filtruj po SurveyId
                .Include(r => r.Answers)                     // 3. Dołącz powiązane Answers
                .SelectMany(r => r.Answers)                  // 4. "Spłaszcz" listę list w jedną listę Answers
                .ToListAsync();

            // 3. Przejdź przez wszystkie pytania ankiety
            foreach (var page in survey.Pages)
            {
                foreach (var question in page.Questions)
                {
                    var questionResult = new QuestionResultDto
                    {
                        QuestionId = question.QuestionId,
                        QuestionText = question.QuestionText
                    };

                    // 4. Filtruj odpowiedzi, aby znaleźć te pasujące do TEGO pytania
                    var answersForThisQuestion = allAnswers
                        .Where(a => a.QuestionId == question.QuestionId)
                        .Select(a => a.AnswerValue)
                        .ToList();

                    questionResult.Answers = answersForThisQuestion;
                    resultDto.Questions.Add(questionResult);
                }
            }

            return Ok(resultDto);
        }
    }
}