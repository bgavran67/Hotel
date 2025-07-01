namespace BACKEND.Models
{
    public class Soba : Entitet
    {
        public string TipSobe { get; set; } = "";

        public decimal Cijena { get; set; }

        public string? Dostupnost { get; set; }

        public double? BrojSobe { get; set; }

    }
}
