using AutoMapper;
using Minera.Data.DTO;
using Minera.Data.Entities;

namespace Minera.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Usuario, UsuarioDTO>();
            CreateMap<UsuarioDTO, Usuario>();
            CreateMap<Insumo, InsumoDTO>();
            CreateMap<InsumoDTO, Insumo>();
            CreateMap<Manutencao, ManutencaoDTO>();
            CreateMap<ManutencaoDTO, Manutencao>();
        }
    }
}