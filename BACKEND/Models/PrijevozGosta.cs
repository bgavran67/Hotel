using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name: "prijevoz_gostiju")]
    public class PrijevozGosta : Entitet
    {
        [Column(name: "datum_polaska")]
        public DateOnly DatumPolaska { get; set; }

        [Column(name: "datum_odlaska")]
        public DateOnly DatumOdlaska { get; set; }

        [Column(name: "vrsta_prijevoza")]
        public string? VrstaPrijevoza { get; set; }

        [Column(name: "lokacija_polazista")]
        public string? LokacijaPolazista { get; set; } = "";
        public string? Dostupnost{ get; set; }

        [Column(name: "broj_putnika")]
        public int BrojPutnika { get; set; }

        [ForeignKey("gost")]
        public required Gost Gost { get; set; }

       
    }
}
