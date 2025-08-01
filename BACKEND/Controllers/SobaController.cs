using System.Reflection.Metadata;
using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SobaController : ControllerBase
    {
        //koristimo dependenx< injection

        //1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;

        //2. u konstruktoru postavljamo vrijednost
        public SobaController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Sobe);
            }
            catch (Exception e)
            {

                return BadRequest(new { poruka = e.Message });
                //kada se ne mozes spojiti na bazu
            }
        }

        //nova metoda dodana
        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest("Šifra nije dobra");
            }
            try
            {
                var soba = _context.Sobe.Find(sifra);
                if (soba == null)
                {
                    return NotFound();
                }
                return Ok(soba);
            }
            catch (Exception e)
            {

                return BadRequest(new { poruka = e.Message });
                //kada se ne mozes spojiti na bazu
            }
        }


        [HttpPost]
        public IActionResult Post(Soba soba)
        {
            try
            {
                _context.Sobe.Add(soba);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, soba);
            }
            catch (Exception e)
            {
                return BadRequest(new { poruka = e.Message });

            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Soba soba)
        {
            if(sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }

            try
            {
                Soba s = _context.Sobe.Find(sifra);

                if(s == null)
                {
                    return NotFound();
                }

                //za sada rucno kasnije autmatika
                s.TipSobe = soba.TipSobe;
                s.BrojSobe = soba.BrojSobe;
                s.Dostupnost = soba.Dostupnost;
                s.Cijena = soba.Cijena;

                _context.Sobe.Update(s);
                _context.SaveChanges();
                return Ok(s);




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
                Soba s = _context.Sobe.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                _context.Sobe.Remove(s);
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
