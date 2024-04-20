namespace CreateTournament.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Phones { get; set; }
        public int Role { get; set; } = 1;

    }
}
