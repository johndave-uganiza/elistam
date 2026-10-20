namespace eListam.Infrastructure.Persistence.Repositories.Generics
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<IEnumerable<T>> GetAsync();
        public Task<T?> GetByIdAsync(int id);
        public Task<T> CreateAsync(T entity);
        public void Update(T entity);
        public void Delete(T entity);
    }
}