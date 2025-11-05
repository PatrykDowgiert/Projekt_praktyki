using Apka.Data;
using Apka.Data.Dtos;
using Apka.Data.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<IActionResult> SubmitResponse([FromBody] ResponseSubmitDto responseDto)
        {
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
    }
}