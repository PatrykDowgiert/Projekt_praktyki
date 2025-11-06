using Apka.Data;
using Apka.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Apka.Data.Dtos;

namespace Apka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveysController : ControllerBase
    {
    [HttpPost]
    public async Task<IActionResult> CreateSurvey([FromBody] SurveyCreateDto surveyDto)
        {
            var newSurvey = new Survey
            {
                Title = surveyDto.Title,
                Description = surveyDto.Description,
                Pages = new List<Page>()
            };

            foreach (var pageDto in surveyDto.Pages)
            {
                var newPage = new Page
                {
                    PageNumber = pageDto.PageNumber,
                    Questions = new List<Question>()
                };

                foreach (var questionDto in pageDto.Questions)
                {
                    var newQuestion = new Question
                    {
                        QuestionText = questionDto.QuestionText,
                        QuestionType = questionDto.QuestionType,
                        QuestionOrder = questionDto.QuestionOrder,
                        MaxLength = (questionDto.QuestionType == QuestionType.Text) ? 250 : null
                    };
                    
                    newPage.Questions.Add(newQuestion);
                }
                
                newSurvey.Pages.Add(newPage);
            }
            _context.Surveys.Add(newSurvey);
            await _context.SaveChangesAsync();

            return Ok(newSurvey);
        }
        private readonly SurveyDbContext _context;

        public SurveysController(SurveyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Survey>>> GetSurveys()
        {
            var surveys = await _context.Surveys.ToListAsync();
            return Ok(surveys);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Survey>> GetSurveyById(int id)
        {
            var survey = await _context.Surveys
                .Include(s => s.Pages)
                    .ThenInclude(p => p.Questions)
                .FirstOrDefaultAsync(s => s.SurveyId == id);

            if (survey == null)
            {
                return NotFound();
            }

            return Ok(survey);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            // 1. Znajdź ankietę w bazie
            var survey = await _context.Surveys.FindAsync(id);

            if (survey == null)
            {
                // Nie ma takiej ankiety
                return NotFound();
            }

            // 2. Usuń ją
            _context.Surveys.Remove(survey);
            
            // 3. Zapisz zmiany
            await _context.SaveChangesAsync();

            // Zwróć kod 204 (No Content), co oznacza "Sukces, nic nie zwracam"
            return NoContent();
        }

            }
}