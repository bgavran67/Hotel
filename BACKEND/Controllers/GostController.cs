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

            [HttpGet]
            public IActionResult Get()
            {
                try
                {
                    return Ok(_context.Gosti);
                }
                catch (Exception e)
                {

                    return BadRequest(e); //kada se ne mozes spojiti na bazu
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
                    return BadRequest(e);
                }
            }
        }
    
}
