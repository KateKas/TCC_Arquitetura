using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minera.Data.Entities
{
    public class ManutencaoDTO 
    {        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public int tipo { get; set; } 

         public DateTime data { get; set; }    

        public string descricao { get; set; }

        public int status { get; set; }          
    }
}