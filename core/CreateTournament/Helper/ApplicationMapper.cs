using AutoMapper;
using CreateTournament.DTOs;
using CreateTournament.DTOs.Auth;
using CreateTournament.Models;

namespace CreateTournament.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() {
            CreateMap<User, UserDTO>().ReverseMap();
            /*.ForMember(u => u.Role, opt => opt.MapFrom(src => src.Role))
            .ForMember(u => u.Username, opt => opt.MapFrom(src => src.Username))
            .ForMember(u => u.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(u => u.Phones, opt => opt.MapFrom(src => src.Phones))*/

        }
    }
}
