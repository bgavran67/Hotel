using System.ComponentModel.DataAnnotations;

namespace BACKEND.Models.DTO
{
    
        public record GostDTORead(
        int Sifra,
        string? Ime,
        string? Prezime,
        string? Email,
        string? Telefon,
        string? Adresa
    );
    
}
