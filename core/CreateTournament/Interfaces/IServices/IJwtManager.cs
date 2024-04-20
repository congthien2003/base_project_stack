using CreateTournament.DTOs;

namespace CreateTournament.Interfaces.IServices
{
    public interface IJwtManager
    {
        string CreateToken(UserDTO user);
        string getHashpassword(string password);
    }
}
