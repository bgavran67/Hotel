using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models.DTO
{
    public record SobaDTOInsertUpdate(
        [Required(ErrorMessage = "Tip sobe obavezno")]
        string? TipSobe,
        [Required(ErrorMessage = "Cijena obavezna")]
        decimal? Cijena,
        string? Dostupnost,
        int? BrojSobe
    
    );
}
