using AutoMapper;
using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    public class HotelController : ControllerBase
    {
        protected readonly EdunovaContext _context;
        protected readonly IMapper _mapper;

        
        public HotelController(EdunovaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}

