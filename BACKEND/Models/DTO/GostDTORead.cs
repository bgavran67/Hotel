using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models.DTO
{
   
    public record GostDTORead(
        int Sifra,
        string? Ime,
        string? Prezime,
        string? Email,
        string? Telefon,
        string? Adresa,
        decimal? Latitude, 
        decimal? Longitude
    );
    
}
