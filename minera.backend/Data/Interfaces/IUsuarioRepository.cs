using System.Threading.Tasks;
using Minera.Data.Entities;

namespace Minera.Data.Interfaces
{
    public interface IUsuarioRepository: IGenericRepository<Usuario>
    {
        Task<Usuario> GetUserByUsername(string username);
    }
}