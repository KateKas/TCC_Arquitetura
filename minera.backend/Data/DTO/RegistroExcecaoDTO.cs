using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Minera.Data.Interfaces;
using Minera.Data.Entities;

namespace Minera.Data.Entities
{
    public class RegistroExcecaoDTO
    {
        public DateTime data_hora_registro { get; set; }
        public string contexto { get; set; }
        public string excecao { get; set; }
    }
}