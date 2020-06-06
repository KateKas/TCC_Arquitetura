using System;
using System.Collections.Generic;

namespace Minera.Data.Entities
{
    public abstract class ResultadoPaginadoBase
    {
        public int pagina_atual { get; set; }
        public int contagem_paginas { get; set; }
        public int tamanho_pagina { get; set; }
        public int contagem_linhas { get; set; }

        public int primeira_linha_pagina
        {

            get { return (pagina_atual - 1) * tamanho_pagina + 1; }
        }

        public int ultima_linha_pagina
        {
            get { return Math.Min(pagina_atual * tamanho_pagina, contagem_linhas); }
        }
    }

    public class ResultadoPaginado<T> : ResultadoPaginadoBase where T : class
    {
        public IList<T> resultados { get; set; }

        public ResultadoPaginado()
        {
            resultados = new List<T>();
        }
    }
}