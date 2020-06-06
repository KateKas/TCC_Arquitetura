using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Minera.Data.Repository;
using Minera.Data;

namespace GenericRepository.Data.Repository
{
    public class ManutencaoRepository : GenericRepository<Manutencao>, IManutencaoRepository
    {
        public ManutencaoRepository(MineraDbContext dbContext)
        : base(dbContext)
        {
            
        }
    }
}