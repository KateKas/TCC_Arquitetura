using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minera.Data.Entities
{
    public class InsumoDTO 
    {        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public string nome { get; set; }     

        public string descricao { get; set; }

        public int status { get; set; }

        public DateTime dataAquisicao { get; set; }

        public DateTime? dataProximaManutencao { get; set; }

        public DateTime? dataUltimaManutencao { get; set; }        
    }
}