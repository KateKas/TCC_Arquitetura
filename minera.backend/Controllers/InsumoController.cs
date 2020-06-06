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
    public class InsumoController : ControllerBase
    {
        // private IUsuarioRepository _usuarioRepository;
        private IInsumoRepository _insumoRepository;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public InsumoController(
            IInsumoRepository insumoRepository,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            // _usuarioRepository = userRepository;
            _insumoRepository = insumoRepository;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


        [HttpPost]
        [Route("api/ativos/insumo")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Cria um novo insumo")]
        public async Task<IActionResult> Create([FromBody] InsumoDTO insumoDTO)
        {
            var mapped = _mapper.Map<Insumo>(insumoDTO);
            await _insumoRepository.Create(mapped);
            return Ok();
        }

        [HttpGet]
        [Route("api/ativos/insumo/")]
        [ProducesResponseType(typeof(IEnumerable<InsumoDTO>), 200)]
        [SwaggerOperation(Summary = "Retorna todos os insumos cadastrados")]

        public IActionResult GetAll()
        {
            return Ok(_insumoRepository.GetAll());
        }

        [HttpGet]
        [Route("api/ativos/insumo/{id}")]
        [ProducesResponseType(typeof(Insumo), 200)]
        [SwaggerOperation(Summary = "Retorna os dados de um insumo de acordo com o id")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _insumoRepository.GetById(id));
        }

        [HttpPut]
        [Route("api/ativos/insumo/{id}")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Atualiza os dados de um insumo de acordo com o id")]
        public async Task<IActionResult> Update(int id, [FromBody] InsumoDTO insumoDTO)
        {
            var oldInsumo = await _insumoRepository.GetById(id);

            var mapped = _mapper.Map<Insumo>(insumoDTO);
            await _insumoRepository.Update(id, mapped);
            return Ok();
        }

        [HttpDelete]
        [Route("api/ativos/insumo/{id}")]
        [ProducesResponseType(200)]
        [SwaggerOperation(Summary = "Exclui os dados de um insumo de acordo com o id")]
        public async Task<IActionResult> Delete(int id)
        {
            await _insumoRepository.Delete(id);
            return Ok();
        }
    }
}