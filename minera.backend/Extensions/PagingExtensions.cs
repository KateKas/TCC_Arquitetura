using System;
using System.Linq;
using Minera.Data.Entities;

namespace Minera.Extensions
{
    public static class PagingExtensions
    {
        public static ResultadoPaginado<T> GetPaged<T>(this IQueryable<T> query, int page, int pageSize) where T : class
        {
            var result = new ResultadoPaginado<T>();
            result.pagina_atual = page;
            result.tamanho_pagina = pageSize;
            result.contagem_linhas = query.Count();


            var pageCount = (double)result.contagem_linhas / pageSize;
            result.contagem_paginas = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.resultados = query.Skip(skip).Take(pageSize).ToList();

            return result;
        }
    }
}