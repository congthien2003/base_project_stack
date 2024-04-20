using CreateTournament.DTOs.Auth;
using CreateTournament.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Win32;
using System.Net;
using System.Net.Http;
using System.Net.Mail;

namespace CreateTournament.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserService _userService;
        private readonly IJwtManager _jwtManager;

        public AuthenticationService(IUserService userService,
                                     IJwtManager jwtManager)
        {
            _userService = userService;
            _jwtManager = jwtManager;
        }

        public async Task<AuthResult> ChangePassword(ChangePasswordDTO request)
        {
            
            AuthResult result = new AuthResult();
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.ConfirmPassword) )
            {
                result.errors.Add("Vui lòng nhập đầy đủ thông tin");
                return result;
            }
            if (request.OldPassword == request.Password)
            {
                result.errors.Add("Mật khẩu mới trùng với mật khẩu cũ");
                return result;
            }
            if (request.ConfirmPassword != request.Password)
            {
                result.errors.Add("Mật khẩu mới không trùng khớp");
                return result;
            }

            var user = await _userService.GetByEmail(request.Email);
            if (user == null)
            {
                result.errors.Add("Sai thông tin tài khoản");
                return result;
            }
            else 
            {
                request.Password = _jwtManager.getHashpassword(request.Password);
                var edit = await _userService.UpdatePassword(user.Id, request.Password);
                var token = _jwtManager.CreateToken(edit);
                result.Token = token;
                return result;
            }
        }

        public async Task<AuthResult> Login(LoginDTO login)
        {
            AuthResult result = new AuthResult();
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                result.errors.Add("Vui lòng nhập đầy đủ thông tin");
                return result;
            }
            var passHash = _jwtManager.getHashpassword(login.Password);
            login.Password = passHash;
            var user = await _userService.Login(login);
            if (user == null)
            {
                result.errors.Add("Sai thông tin tài khoản");
                return result;
            }
            var token = _jwtManager.CreateToken(user);
            
            result.Token = token;
            return result;
                
        }

        public async Task<AuthResult> Register(RegisterDTO register)
        {
            AuthResult result = new AuthResult();
            if (register == null || string.IsNullOrEmpty(register.Email) || string.IsNullOrEmpty(register.Password))
            {
                result.errors.Add("Vui lòng nhập đầy đủ thông tin");
                return result;
            }
            var emailExists = await _userService.GetByEmail(register.Email);
            if (emailExists != null )
            {
                result.errors.Add("Email đã tồn tại");
                return result;
            }
            else
            {
                register.Password = _jwtManager.getHashpassword(register.Password);
                var user = await _userService.Register(register);
                var token = _jwtManager.CreateToken(user);
                result.Token = token;
                return result;
            }
        }

        public async Task<AuthResult> RestorePassword(RestorePasswordDTO request)
        {
            AuthResult result = new AuthResult();
            if (request == null || string.IsNullOrEmpty(request.Email))
            {
                result.errors.Add("Vui lòng nhập đầy đủ thông tin");
                return result;
            }
            var emailExists = await _userService.GetByEmail(request.Email);
            if (emailExists == null)
            {
                result.errors.Add("Email không tồn tại");
                return result;
            }
            else
            {
                string newPassword = randomPassowrd();
                var sending = SendEmailAsync(request.Email, newPassword);
                if (sending == false)
                {
                    result.errors.Add("Đã xảy ra lỗi trong quá trình khôi phục mật khẩu");
                    return result;
                }
                newPassword = _jwtManager.getHashpassword(newPassword);
                var user = await _userService.UpdatePassword(emailExists.Id, newPassword);
                var token = _jwtManager.CreateToken(user);
                result.Token = token;
                return result;
            }
        }

        private string randomPassowrd()
        {
            Random rand = new Random();
            int stringlen = rand.Next(4, 10);
            int randValue;
            string str = "";
            char letter;
            for (int i = 0; i < stringlen; i++)
            {
                // Generating a random number. 
                randValue = rand.Next(0, 26);

                // Generating random character by converting 
                // the random number into character. 
                letter = Convert.ToChar(randValue + 65);

                // Appending the letter to string. 
                str = str + letter;
            }
            return str;
        }

        public bool SendEmailAsync(string email, string message)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                var to = email;
                var from = "nhat23891@gmail.com";
                var pass = "zohi sncr hcqk kwwd";
                var messgeBody = "Mật khẩu mới của bạn là: " + message;
                mailMessage.To.Add(to);
                mailMessage.From = new MailAddress(from);
                mailMessage.Body = messgeBody;
                mailMessage.Subject = "Khôi phục mật khẩu tài khoản";

                SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                smtp.EnableSsl = true;
                smtp.Port = 587;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(from, pass);

                smtp.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            

          
        }
    }
}
