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

        [Column("gost")]
        public int GostSifra { get; set; }
        public required Gost Gost { get; set; }

        [Column("soba")]
        public int SobaSifra { get; set; }
        public required Soba Soba { get; set; }
    }
}

