using AutoMapper;
using BACKEND.Data;
using BACKEND.Models;
using BACKEND.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PrijevozGostaController(EdunovaContext context, IMapper mapper) : HotelController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<PrijevozGostaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<PrijevozGostaDTORead>>(_context.PrijevoziGosta.Include(g => g.Gost).ToList()));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        [HttpGet("{sifra:int}")]
        public ActionResult<PrijevozGostaDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            PrijevozGosta? e;
            try
            {
                e = _context.PrijevoziGosta.Include(g => g.Gost).FirstOrDefault(g => g.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Prijevoz gosta ne postoji u bazi" });
            }

            return Ok(_mapper.Map<PrijevozGostaDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(PrijevozGostaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Gost? es;
            try
            {
                es = _context.Gosti.Find(dto.GostSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Gost na prijevoz gosta ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<PrijevozGosta>(dto);
                e.Gost = es;
                _context.PrijevoziGosta.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<PrijevozGostaDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
        [HttpPut("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, PrijevozGostaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                PrijevozGosta? e;
                try
                {
                    e = _context.PrijevoziGosta.Include(g => g.Gost).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Prijevoz gosta ne postoji u bazi" });
                }

                Gost? es;
                try
                {
                    es = _context.Gosti.Find(dto.GostSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Gost na prijevoz gosta ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Gost = es;
                _context.PrijevoziGosta.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpDelete("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                PrijevozGosta? e;
                try
                {
                    e = _context.PrijevoziGosta.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Prijevoz gosta ne postoji u bazi");
                }
                _context.PrijevoziGosta.Remove(e);
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

