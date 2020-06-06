using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Minera.Data.Repository;
using Minera.Data;

namespace GenericRepository.Data.Repository
{
    public class InsumoRepository : GenericRepository<Insumo>, IInsumoRepository
    {
        public InsumoRepository(MineraDbContext dbContext)
        : base(dbContext)
        {
            
        }
    }
}