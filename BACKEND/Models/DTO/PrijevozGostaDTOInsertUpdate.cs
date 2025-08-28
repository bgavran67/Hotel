using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models.DTO
{
   
        public record PrijevozGostaDTOInsertUpdate(
        [Required(ErrorMessage = "Datum polaska obavezno")]
        DateOnly? DatumPolaska,
        [Required(ErrorMessage = "Datum odlaska obavezno")]
        DateOnly? DatumOdlaska,
        string? VrstaPrijevoza,
        [Required(ErrorMessage = "Lokacija polazišta obavezno")]
        string? LokacijaPolazista,
        string? Dostupnost,
        [Required(ErrorMessage = "Broj putnika obavezno")]
        int BrojPutnika,
        int? GostSifra
    );
    
}
