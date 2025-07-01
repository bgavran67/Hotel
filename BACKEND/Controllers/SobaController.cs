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

                return BadRequest(e); //kada se ne mozes spojiti na bazu
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
                return BadRequest(e);
            }
        }







    }
}
