using AutoMapper;
using CreateTournament.DTOs;
using CreateTournament.Interfaces.IServices;
using CreateTournament.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CreateTournament.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
            
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _userService.GetById(id);
            return user;
        }

        [HttpPut("update")]
        public async Task<UserDTO> Update(UserDTO user)
        {
            var update = await _userService.Edit(user);
            return update;
        }

    }
}
