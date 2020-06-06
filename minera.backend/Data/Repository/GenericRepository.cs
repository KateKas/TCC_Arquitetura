using System;
using System.Linq;
using System.Threading.Tasks;
using Minera.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Minera.Data.Entities;
using Minera.Extensions;
using System.Collections.Generic;

namespace Minera.Data.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : class, IEntity
    {
        private readonly MineraDbContext _dbContext;

        public GenericRepository(MineraDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResultadoPaginado<TEntity> GetPagedResult(int page, int pageSize = 10)
        {
            return _dbContext.Set<TEntity>().GetPaged(page, pageSize);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsNoTracking();
        }

        public IQueryable<TEntity> FindBy(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            IQueryable<TEntity> query = _dbContext.Set<TEntity>().Where(predicate).AsQueryable();
            return query;
        }

        public async Task<TEntity> GetById(int id)
        {
            return await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.id == id);
        }

        public async Task<int> Create(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity.id;
        }

        public async Task Create(List<TEntity> entitys)
        {
            await _dbContext.Set<TEntity>().AddRangeAsync(entitys);
            await _dbContext.SaveChangesAsync();
        }

        [Obsolete]
        public async Task ExecuteQuery(string query)
        {
            await _dbContext.Database.ExecuteSqlCommandAsync(query);
        }

        public async Task Update(int id, TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var entity = await _dbContext.Set<TEntity>().FindAsync(id);
            _dbContext.Set<TEntity>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(List<TEntity> entitys)
        {
            _dbContext.Set<TEntity>().RemoveRange(entitys);
            await _dbContext.SaveChangesAsync();
        }
    }
}