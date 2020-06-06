using System.Linq;
using System.Threading.Tasks;
using Minera.Data.Entities;
using Minera.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Minera.Data.Repository
{
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(MineraDbContext dbContext)
        : base(dbContext)
        {
            
        }

        public async Task<Usuario> GetUserByUsername(string username)
        {
            return await GetAll().Where(lambda=> lambda.username == username).FirstOrDefaultAsync();
        }
    }
}