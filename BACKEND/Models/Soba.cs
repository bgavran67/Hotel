using System.ComponentModel.DataAnnotations.Schema;

namespace BACKEND.Models
{
    [Table(name: "sobe")]
    public class Soba : Entitet
    {
        [Column(name:"tip_sobe")] //ako zelim promjeniti naziv radim ovako --> [Column(name"izmjena")]
        
        public string TipSobe { get; set; } = "";
        
        public decimal Cijena { get; set; }

        public string? Dostupnost { get; set; }
        
        [Column(name: "broj_sobe")]
        public int? BrojSobe { get; set; }

        public ICollection<Gost>? Gosti { get; set; } = [];
    }
}
