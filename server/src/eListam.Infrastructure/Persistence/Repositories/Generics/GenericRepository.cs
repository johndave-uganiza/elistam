using eListam.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories.Generics
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet;

        #region Constructor
        public GenericRepository(ApplicationDbContext db)
        {
            _dbSet = db.Set<T>();
        }
        #endregion

        #region GetAsync
        public async virtual Task<IEnumerable<T>> GetAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }
        #endregion

        #region GetByIdAsync
        public async virtual Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        #endregion

        #region CreateAsync
        public async virtual Task<T> CreateAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }
        #endregion

        #region Update
        public async virtual void Update(T entity)
        {
            _dbSet.Update(entity);
        }
        #endregion

        #region Delete
        public async virtual void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }
        #endregion
    }
}
