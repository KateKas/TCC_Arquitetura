using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Minera.Data.Interfaces;

namespace Minera.Data.Entities
{
    [Table("manutencao")]
    public class Manutencao : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public int tipo { get; set; }

        public DateTime data { get; set; }

        [MaxLength(250)]
        public string descricao { get; set; }

        public int status { get; set; }
    }
}