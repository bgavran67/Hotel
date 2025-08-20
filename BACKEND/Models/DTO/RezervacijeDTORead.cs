namespace BACKEND.Models.DTO
{
    public record RezervacijaDTORead(
        int Sifra,
        decimal? UkupnaCijena,
        DateTime? VrijemeDatumPrijave,
        DateTime? VrijemeDatumOdjave,
        string? GostIme,
        string? GostPrezime,
        string? GostEmail,
        string? SobaTipSobe,
        string? SobaCijena
    );
}
