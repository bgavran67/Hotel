using System.Reflection.Metadata;
using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class GostController : ControllerBase
    {
        //koristimo dependency injection

        //1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;

        //2. u konstruktoru postavljamo vrijednost
        public GostController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest("Šifra nije dobra");
            }
            try
            {
                var gost = _context.Gosti.Find(sifra);
                if (gost == null)
                {
                    return NotFound();
                }
                return Ok(gost);
            }
            catch (Exception e)
            {

                return BadRequest(new { poruka = e.Message });
                //kada se ne mozes spojiti na bazu
            }
        }

        [HttpPost]
        public IActionResult Post(Gost gost)
        {
            try
            {
                _context.Gosti.Add(gost);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, gost);
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });

            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Gost gost)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }

            try
            {
                Gost g = _context.Gosti.Find(sifra);

                if (g == null)
                {
                    return NotFound();
                }

                //za sada rucno kasnije autmatika
                g.Ime = gost.Ime;
                g.Prezime = gost.Prezime;
                g.Email = gost.Email;
                g.Telefon = gost.Telefon;
                g.Adresa = gost.Adresa;

                _context.Gosti.Update(g);
                _context.SaveChanges();
                return Ok(g);




            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });


            }
        }




        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }

            try
            {
                Gost g = _context.Gosti.Find(sifra);

                if (g == null)
                {
                    return NotFound();
                }

                _context.Gosti.Remove(g);
                _context.SaveChanges();
                return NoContent();




            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });


            }
        }
    }
}
