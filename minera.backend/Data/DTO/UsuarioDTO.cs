using Minera.Data.Interfaces;

namespace Minera.Data.DTO
{
    public class UsuarioDTO : IEntity
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string papel { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string token { get; set; }
    }
}