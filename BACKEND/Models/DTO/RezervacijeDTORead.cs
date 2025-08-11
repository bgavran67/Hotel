namespace BACKEND.Models.DTO
{
    public record RezervacijaDTORead(
        int Sifra,
        decimal? UkupnaCijena,
        DateTime? VrijemeDatumPrijave,
        DateTime? VrijemeDatumOdjave,
        string? GostImePrezimeEmail,
        string? SobaTipSobeCijena
    );
}
