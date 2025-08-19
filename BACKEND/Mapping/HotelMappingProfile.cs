using AutoMapper;
using BACKEND.Models;
using BACKEND.Models.DTO;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BACKEND.Mapping
{
    public class HotelMappingProfile : Profile
    {
        public HotelMappingProfile()
        {
            CreateMap<Gost, GostDTORead>();
            CreateMap<GostDTOInsertUpdate, Gost>();

            // SOBA
            CreateMap<Soba, SobaDTORead>();
            CreateMap<SobaDTOInsertUpdate, Soba>();

            // PRIJEVOZ GOSTA
            
            CreateMap<PrijevozGosta, PrijevozGostaDTORead>()
                .ForCtorParam("GostIme", 
                opt => opt.MapFrom(src => src.Gost.Ime))
                .ForCtorParam("GostPrezime", 
                opt => opt.MapFrom(src => src.Gost.Prezime));

            /*
            CreateMap<PrijevozGostaDTOInsertUpdate, PrijevozGosta>()
                .ForMember(dest => dest.Gost,
                opt => opt.Ignore());
            
            // REZERVACIJA
           
            CreateMap<Rezervacija, RezervacijaDTORead>()
                .ForCtorParam("GostIme", 
                opt => opt.MapFrom(src => src.Gost.Ime))
                .ForCtorParam("GostPrezime", 
                opt => opt.MapFrom(src => src.Gost.Prezime))
                .ForCtorParam("GostEmail", 
                opt => opt.MapFrom(src => src.Gost.Email))
                .ForCtorParam("SobaTipSobe", 
                opt => opt.MapFrom(src => src.Soba.TipSobe));
                .ForCtorParam("SobaCijena", 
                opt => opt.MapFrom(src => src.Soba.TipSobe));

            CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>()
                .ForMember(dest => dest.Gost, 
                opt => opt.Ignore())
                .ForMember(dest => dest.Soba, 
                opt => opt.Ignore());


            */

        }
    }
}