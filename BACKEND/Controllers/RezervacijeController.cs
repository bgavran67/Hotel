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
    public class RezervacijeController(EdunovaContext context, IMapper mapper) : HotelController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<RezervacijaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<RezervacijaDTORead>>(
                    _context.Rezervacije
                        .Include(r => r.Gost)
                        .Include(r => r.Soba)
                        .ToList()
                ));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<RezervacijaDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Rezervacija? e;
            try
            {
                e = _context.Rezervacije.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Rezervacija ne postoji u bazi" });
            }

            return Ok(_mapper.Map<RezervacijaDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(RezervacijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }


            Gost? g;
            try
            {
                g = _context.Gosti.Find(dto.Gost);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (g == null)
            {
                return NotFound(new { poruka = "Gost ne postoji u bazi" });
            }

            Soba? s;
            try
            {
                s = _context.Sobe.Find(dto.Soba);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (s == null)
            {
                return NotFound(new { poruka = "Soba ne postoji u bazi" });
            }


            try
            {
                Rezervacija e = _mapper.Map<Rezervacija>(dto);
                e.Soba = s;
                e.Gost = g;
                _context.Rezervacije.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<RezervacijaDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, RezervacijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Rezervacija? e;
                try
                {
                    e = _context.Rezervacije.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Rezervacija ne postoji u bazi" });
                }


                Gost? g;
                try
                {
                    g = _context.Gosti.Find(dto.Gost);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (g == null)
                {
                    return NotFound(new { poruka = "Gost ne postoji u bazi" });
                }

                Soba? s;
                try
                {
                    s = _context.Sobe.Find(dto.Soba);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (s == null)
                {
                    return NotFound(new { poruka = "Soba ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Soba = s;
                e.Gost = g;
                _context.Rezervacije.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpDelete]
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
                Rezervacija? e;
                try
                {
                    e = _context.Rezervacije.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Rezervacija ne postoji u bazi");
                }
                _context.Rezervacije.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}

