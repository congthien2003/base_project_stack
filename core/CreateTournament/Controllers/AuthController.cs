using CreateTournament.DTOs;
using CreateTournament.DTOs.Auth;
using CreateTournament.Interfaces.IServices;
using CreateTournament.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace CreateTournament.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IJwtManager _jwtManager;

        public AuthController(IAuthenticationService authenticationService, IJwtManager jwtManager)
        {
            _authenticationService = authenticationService;
            _jwtManager = jwtManager;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register(RegisterDTO request)
        {
            var result = await _authenticationService.Register(request);
            if (result.errors.Any()) {
                return BadRequest(new { result.errors });
            }
            return Ok(result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginDTO request)
        {
            var result = await _authenticationService.Login(request);
            if (result.errors.Any())
            {
                return BadRequest(new { result.errors });
            }
            return Ok(result);
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<ActionResult> ChangePassword(ChangePasswordDTO request)
        {
            var result = await _authenticationService.ChangePassword(request);
            if (result.errors.Any())
            {
                return BadRequest(new { result.errors });
            }
            return Ok(result);
        }

        [HttpPost("restore-password")]
        public async Task<ActionResult> RestorePassword(RestorePasswordDTO request)
        {
            var result = await _authenticationService.RestorePassword(request);
            if (result.errors.Any())
            {
                return BadRequest(new { result.errors });
            }
            return Ok(result);
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            return Ok();
        }

        [HttpPost("refresh-token")]
        public ActionResult RefreshToken(UserDTO userDTO)
        {
            var token =_jwtManager.CreateToken(userDTO);
            if (token == null)
            {
                return BadRequest();
            }
            
            return Ok(new
            {
                token
            });
        }


    }
}

