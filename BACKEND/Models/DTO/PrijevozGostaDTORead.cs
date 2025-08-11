namespace BACKEND.Models.DTO
{
    
        public record PrijevozGostaDTORead(
        int Sifra,
        DateOnly? DatumPolaska,
        DateOnly? DatumOdlaska,
        string? VrstaPrijevoza,
        string? LokacijaPolazista,
        string? Dostupnost,
        int? BrojPutnika,
        string? GostImePrezimeEmail
    );
    
}
