using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name: "gosti")]
    public class Gost : Entitet
    {

        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";

        public string Email { get; set; } = "";

        public string? Telefon { get; set; }

        public string? Adresa { get; set; }

        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public ICollection<Soba>? Sobe { get; set; }


    }
}
