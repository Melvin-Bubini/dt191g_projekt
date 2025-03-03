using System.ComponentModel.DataAnnotations;

namespace dt191g_projekt.Models {
    public class PortfolioModel {
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public string? Competence { get; set; }
        [Required]
        [Url]
        public string? GithubLink { get; set; }
        [Url]
        public string? Url { get; set; }
    }
}