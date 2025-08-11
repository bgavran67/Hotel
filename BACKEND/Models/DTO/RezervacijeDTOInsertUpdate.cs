namespace BACKEND.Models.DTO
{
    public record RezervacijaDTOInsertUpdate(
         decimal? UkupnaCijena,
         DateTime? VrijemeDatumPrijave,
         DateTime? VrijemeDatumOdjave,
         int? GostSifra,
         int? SobaSifra
     );
}
