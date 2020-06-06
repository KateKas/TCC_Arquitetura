using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Annotations;

namespace Minera.Controllers
{
    [Authorize(Roles = "client,admin")]
    [ApiController]
    public class ManutencaoController : ControllerBase
    {
        // private IUsuarioRepository _usuarioRepository;
        private IManutencaoRepository _manutencaoRepository;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ManutencaoController(
            IManutencaoRepository manutencaoRepository,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            // _usuarioRepository = userRepository;
            _manutencaoRepository = manutencaoRepository;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


        [HttpPost]
        [Route("api/ativos/manutencao")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Cria um novo manutencao")]
        public async Task<IActionResult> Create([FromBody] ManutencaoDTO manutencaoDTO)
        {
            var mapped = _mapper.Map<Manutencao>(manutencaoDTO);
            await _manutencaoRepository.Create(mapped);
            return Ok();
        }

        [HttpGet]
        [Route("api/ativos/manutencao/")]
        [ProducesResponseType(typeof(IEnumerable<ManutencaoDTO>), 200)]
        [SwaggerOperation(Summary = "Retorna todos as manutenções cadastradas")]

        public IActionResult GetAll()
        {
            return Ok(_manutencaoRepository.GetAll());
        }

        [HttpGet]
        [Route("api/ativos/manutencao/{id}")]
        [ProducesResponseType(typeof(Manutencao), 200)]
        [SwaggerOperation(Summary = "Retorna os dados de uma manutenção de acordo com o id")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _manutencaoRepository.GetById(id));
        }

        [HttpPut]
        [Route("api/ativos/manutencao/{id}")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Atualiza os dados de uma manutenção de acordo com o id")]
        public async Task<IActionResult> Update(int id, [FromBody] ManutencaoDTO manutencaoDTO)
        {
            var oldManutencao = await _manutencaoRepository.GetById(id);

            var mapped = _mapper.Map<Manutencao>(manutencaoDTO);
            await _manutencaoRepository.Update(id, mapped);
            return Ok();
        }

        [HttpDelete]
        [Route("api/ativos/manutencao/{id}")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Exclui os dados de uma manutenção de acordo com o id")]
        public async Task<IActionResult> Delete(int id)
        {
            await _manutencaoRepository.Delete(id);
            return Ok();
        }
    }
}