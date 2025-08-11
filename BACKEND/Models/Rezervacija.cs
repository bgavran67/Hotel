using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    public class Rezervacija : Entitet
    {
        [Column(name: "ukupna_cijena")]
        public decimal? UkupnaCijena { get; set; }

        [Column(name: "vrijeme_datum_prijave")]
        public DateTime? VrijemeDatumPrijave { get; set; }

        [Column(name: "vrijeme_datum_odjave")]
        public DateTime? VrijemeDatumOdjave { get; set; }

        public int GostSifra { get; set; }

        
        [ForeignKey("GostSifra")]
        public Gost Gost { get; set; }
        public int SobaSifra { get; set; }

        
        [ForeignKey("SobaSifra")]
        public Soba Soba { get; set; }
    }
}

