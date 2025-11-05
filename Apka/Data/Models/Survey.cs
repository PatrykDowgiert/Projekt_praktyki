using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Apka.Data.Models
{
    public class Survey
    {
        [Key]
        public int SurveyId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public virtual ICollection<Page> Pages { get; set; } = new List<Page>();

        public virtual ICollection<SurveyResponse> Responses { get; set; } = new List<SurveyResponse>();
    }
}