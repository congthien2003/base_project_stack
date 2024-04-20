using CreateTournament.DTOs;
using CreateTournament.DTOs.Auth;
using CreateTournament.Models;

namespace CreateTournament.Interfaces.IServices
{
    public interface IUserService
    {
        Task<UserDTO> Login(LoginDTO loginDTO);
        Task<UserDTO> Register(RegisterDTO registerDTO);
        Task<UserDTO> GetById(int id, bool includeDeleted = false);
        Task<User> GetByEmail(string email, bool includeDeleted = false);
        Task<bool> Delete(int id);
        Task<UserDTO> Edit(UserDTO user);
        Task<UserDTO> UpdatePassword(int id, string password, bool includeDeleted = false);
    }
}
