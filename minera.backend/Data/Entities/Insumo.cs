using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Minera.Data.Interfaces;

namespace Minera.Data.Entities
{
    [Table("insumo")]
    public class Insumo : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [MaxLength(100)]
        public string nome { get; set; }

        [MaxLength(250)]
        public string descricao { get; set; }

        public int status { get; set; }

        public DateTime dataAquisicao { get; set; }

        public DateTime? dataProximaManutencao { get; set; }

        public DateTime? dataUltimaManutencao { get; set; }
    }
}