using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Minera.Data.Entities;

namespace Minera.Data.Interfaces
{
    public interface IGenericRepository<TEntity>
        where TEntity : class
    {
        ResultadoPaginado<TEntity> GetPagedResult(int page, int pageSize = 10);
        IQueryable<TEntity> GetAll();
        
        Task ExecuteQuery(string query);

        IQueryable<TEntity> FindBy(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate);

        Task<TEntity> GetById(int id);

        Task<int> Create(TEntity entity);

        Task Create(List<TEntity> entitys);

        Task Update(int id, TEntity entity);

        Task Delete(int id);

        Task Delete(List<TEntity> entitys);
    }
}