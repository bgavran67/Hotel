namespace BACKEND.Models.DTO
{
    public record SobaDTORead(
       int Sifra,
       string? TipSobe,
       decimal? Cijena,
       string? Dostupnost,
       int? BrojSobe
   );
}
