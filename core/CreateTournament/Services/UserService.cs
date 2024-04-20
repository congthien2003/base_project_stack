using System.Security.Claims;
using AutoMapper;
using CreateTournament.DTOs;
using CreateTournament.DTOs.Auth;
using CreateTournament.Interfaces.IRepositories;
using CreateTournament.Interfaces.IServices;
using CreateTournament.Models;

namespace CreateTournament.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository<User> _userRepository;
        private readonly IMapper mapper;

        public UserService(
                           IUserRepository<User> userRepository,
                           IMapper mapper)
        {
            _userRepository = userRepository;
            this.mapper = mapper;
        }

        public async Task<bool> Delete(int id)
        {
            await _userRepository.Delete(id);
            return true;
        }

        public async Task<UserDTO> Edit(UserDTO dto)
        {
            var user = mapper.Map<User>(dto);
            var edit = await _userRepository.Edit(user);
            return mapper.Map<UserDTO>(edit);
        }

        public async Task<UserDTO> Login(LoginDTO loginDTO)
        {
            var login = await _userRepository.GetByLogin(loginDTO.Email, loginDTO.Password);
            return mapper.Map<UserDTO>(login);
        }

        public async Task<UserDTO> GetById(int id, bool includeDeleted = false)
        {
            var user = await _userRepository.GetById(id, includeDeleted);
            return mapper.Map<UserDTO>(user);
        }

        public async Task<User> GetByEmail(string email, bool includeDeleted = false)
        {
            var user = await _userRepository.GetByEmail(email);
            return mapper.Map<User>(user);
        }

        public async Task<UserDTO> Register(RegisterDTO registerDTO)
        {
           var user = await _userRepository.CreateUser(registerDTO);
           return mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> UpdatePassword(int id, string password, bool includeDeleted = false)
        {
            var user = await _userRepository.UpdatePassword(id, password, includeDeleted);
            return mapper.Map<UserDTO>(user);
        }
    }
}
