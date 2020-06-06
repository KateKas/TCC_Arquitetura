using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Minera.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using Minera.Data.DTO;
namespace Minera.Controllers
{
    [Authorize(Roles = "admin")]
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository;
        private IUsuarioService _usuarioService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        public UsuarioController(
            IUsuarioRepository usuarioRepository,
            IUsuarioService usuarioService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _usuarioRepository = usuarioRepository;
            _usuarioService = usuarioService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(UsuarioDTO), 200)]
        [SwaggerOperation(Summary = "Gera um Bearer token para a camada de autenticação dos serviços da API")]
        public async Task<IActionResult> Authenticate([FromBody] LoginDTO loginDto)
        {          

            var user = await _usuarioService.Authenticate(loginDto.username, loginDto.password);

            if (user == null)
                return BadRequest(new { Message = "Usuário ou senha incorretos." });            

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.id.ToString()),
                    new Claim(ClaimTypes.Role, user.papel)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store 1client side
            return Ok(new UsuarioDTO()
            {
                id = user.id,
                username = user.username,
                nome = user.nome,
                token = tokenString,
                papel = user.papel
            });
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Cria um novo usuário")]
        public async Task<IActionResult> Create([FromBody] UpdateUsuarioDTO user_DTO)
        {
            //LogHelper.CreateServerRequestLog(ControllerContext.HttpContext, _usuarioRepository, _accessor).Wait();
            // map dto to entity
            var user = _mapper.Map<Usuario>(user_DTO);

            try
            {
                // save 
                await _usuarioService.Create(user, user_DTO.password);
                return Ok();
            }
            catch (BusinessException ex)
            {
                // return error message if there was an exception
                return BadRequest(new ErrorResponse() { Message = ex.Message });
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UsuarioDTO>), 200)]
        [SwaggerOperation(Summary = "Retorna os dados de todos os usuários cadastrados")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _usuarioService.GetAll();
            var user_DTOs = _mapper.Map<IEnumerable<Usuario>, IEnumerable<UsuarioDTO>>(users);

            return Ok(user_DTOs);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UsuarioDTO), 200)]
        [SwaggerOperation(Summary = "Retorna os dados de um usuário de acordo com o id")]
        public IActionResult GetById(int id)
        {
            var user = _usuarioService.GetById(id);
            var user_DTO = _mapper.Map<UsuarioDTO>(user);

            return Ok(user_DTO);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Atualiza os dados de um usuário de acordo com o id")]
        public async Task<IActionResult> Update(int id, [FromBody] UsuarioDTO user_DTO)
        {
            // map dto to entity and set id
            var user = _mapper.Map<Usuario>(user_DTO);
            user.id = id;

            try
            {
                // save 
                await _usuarioService.Update(user, user_DTO.password);
                return Ok();
            }
            catch (BusinessException ex)
            {
                // return error message if there was an exception
                return BadRequest(new ErrorResponse()
                {
                    Message = ex.Message
                });
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Exclui os dados de um usuário de acordo com o id")]
        public async Task<IActionResult> Delete(int id)
        {
            await _usuarioService.Delete(id);
            return Ok();
        }
    }
}