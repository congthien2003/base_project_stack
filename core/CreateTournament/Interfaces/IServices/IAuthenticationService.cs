using CreateTournament.DTOs.Auth;

namespace CreateTournament.Interfaces.IServices
{
    public interface IAuthenticationService
    {
        Task<AuthResult> Login(LoginDTO login);
        Task<AuthResult> Register(RegisterDTO register);
        Task<AuthResult> ChangePassword(ChangePasswordDTO request);
        Task<AuthResult> RestorePassword(RestorePasswordDTO request);

    }
}
