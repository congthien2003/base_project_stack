namespace CreateTournament.DTOs.Auth
{
    public class AuthResult
    {
        public string Token { get; set; } = string.Empty;
        public List<string> errors {  get; set; } = new List<string>();
        
    }
}
