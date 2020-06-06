using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Minera.Data.Interfaces;

namespace Minera.Data.Entities
{
    [Table("usuario")]
    public class Usuario : IEntity
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [MaxLength(50)]
        public string nome { get; set; }     

        [MaxLength(10)]   
        public string papel { get; set; }

        [MaxLength(20)]
        public string username { get; set; }
        
        [MaxLength(200)]
        public byte[] password_hash { get; set; }

         [MaxLength(200)]
        public byte[] password_salt { get; set; }
        
    }
}