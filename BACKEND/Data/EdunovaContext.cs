using BACKEND.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BACKEND.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions <EdunovaContext> opcije) : base(opcije)
        {
            
        }

        public DbSet<Soba> Sobe { get; set; } //zbog ovog ovdje Soba tablica se zove u mnozini

        public DbSet<Gost> Gosti { get; set; }

        public DbSet<Rezervacija> Rezervacije { get; set; }
        public DbSet<PrijevozGosta> PrijevoziGosta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // implementacija veze 1:n
            modelBuilder.Entity<PrijevozGosta>().HasOne(g => g.Gost);

            modelBuilder.Entity<Rezervacija>().HasOne(g => g.Gost);

            modelBuilder.Entity<Rezervacija>().HasOne(g => g.Soba);

            // implementacija veze n:n
            modelBuilder.Entity<Gost>()
                .HasMany(g => g.Sobe)
                .WithMany(p => p.Gosti)
                .UsingEntity<Dictionary<string, object>>("rezervacije",
                c => c.HasOne<Soba>().WithMany().HasForeignKey("soba"),
                c => c.HasOne<Gost>().WithMany().HasForeignKey("gost"),
                c => c.ToTable("rezervacije")
                );

            modelBuilder.Entity<Soba>()
                .HasMany(s => s.Rezervacije);

        }


    }
}
