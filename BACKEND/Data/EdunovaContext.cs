using BACKEND.Models;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions <EdunovaContext> options) : base(options)
        {
            //ovdje se mogu fino postaviti opcije, ali ne za sada
        }

        public DbSet<Soba> Sobe { get; set; } //zbog ovog ovdje Soba tablica se zove u mnozini

        public DbSet<Gost> Gosti { get; set; }
        

    }
}
