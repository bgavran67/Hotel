using AutoMapper;
using BACKEND.Data;
using BACKEND.Models;
using BACKEND.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class GostController(EdunovaContext context, IMapper mapper) : HotelController(context, mapper)
    {
        [HttpGet("{sifra:int}")]
        public ActionResult<List<GostDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<GostDTORead>>(_context.Gosti));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<GostDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Gost? e;
            try
            {
                e = _context.Gosti.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Gost ne postoji u bazi" });
            }

            return Ok(_mapper.Map<GostDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(GostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Gost>(dto);
                _context.Gosti.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<GostDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut("{sifra:int}")]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, GostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Gost? e;
                try
                {
                    e = _context.Gosti.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Gost ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Gosti.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }



        [HttpDelete("{sifra:int}")]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Gost? e;
                try
                {
                    e = _context.Gosti.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Smjer ne postoji u bazi");
                }
                _context.Gosti.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        //Soba N:N

        [HttpGet]
        [Route("Sobe/{sifraGosti:int}")]
        public ActionResult<List<SobaDTORead>> GetSobe(int sifraGosti)
        {
            if (!ModelState.IsValid || sifraGosti <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Gosti
                    .Include(i => i.Sobe).FirstOrDefault(x => x.Sifra == sifraGosti);
                if (p == null)
                {
                    return BadRequest("Ne postoji gost sa šifrom " + sifraGosti + " u bazi");
                }

                return Ok(_mapper.Map<List<SobaDTORead>>(p.Sobe));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpPost]
        [Route("{sifra:int}/dodaj/{sobaSifra:int}")]
        public IActionResult DodajSobu(int sifra, int sobaSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || sobaSifra <= 0)
            {
                return BadRequest("Šifra sobe ili gosta nije dobra");
            }
            try
            {
                var gost = _context.Gosti
                    .Include(g => g.Sobe)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (gost == null)
                {
                    return BadRequest("Ne postoji soba sa šifrom " + sifra + " u bazi");
                }
                var soba = _context.Sobe.Find(sobaSifra);
                if (soba == null)
                {
                    return BadRequest("Ne postoji soba sa šifrom " + sobaSifra + " u bazi");
                }
                gost.Sobe.Add(soba);
                _context.Gosti.Update(gost);
                _context.SaveChanges();
                return Ok(new
                {
                    poruka = "Soba " + soba.TipSobe + " dodana na gosta "
                 + gost.Ime + gost.Prezime + gost.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);
            }
        }


        [HttpDelete]
        [Route("{sifra:int}/obrisi/{sobaSifra:int}")]
        public IActionResult ObrisiSobu(int sifra, int sobaSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || sobaSifra <= 0)
            {
                return BadRequest("Šifra sobe ili gosta nije dobra");
            }
            try
            {
                var gost = _context.Gosti
                    .Include(g => g.Sobe)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (gost == null)
                {
                    return BadRequest("Ne postoji gost sa šifrom " + sifra + " u bazi");
                }
                var soba = _context.Sobe.Find(sobaSifra);
                if (soba == null)
                {
                    return BadRequest("Ne postoji soba sa šifrom " + sobaSifra + " u bazi");
                }
                gost.Sobe.Remove(soba);
                _context.Gosti.Update(gost);
                _context.SaveChanges();

                return Ok(new
                {
                    poruka = "Soba " + soba.TipSobe + " obrisano iz gost " + gost.Ime + gost.Prezime + gost.Email
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });

            }
        }





    }
}
