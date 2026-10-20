using eListam.Application.Services.Interfaces;
using eListam.Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace eListam.Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;
        private IDbContextTransaction? _currentTransaction;

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task BeginTransactionAsync()
        {
            if (_currentTransaction != null)
            {
                throw new InvalidOperationException("A transaction is already in progress.");
            }

            _currentTransaction = await _db.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_currentTransaction == null)
            {
                throw new InvalidOperationException("No active transaction to commit.");
            }

            try
            {
                await _db.SaveChangesAsync();
                await _currentTransaction.CommitAsync();
            }
            catch
            {
                try
                {
                    await _currentTransaction.RollbackAsync();
                } 
                catch { }
                throw;
            } 
            finally
            {
                await _currentTransaction.DisposeAsync();
                _currentTransaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_currentTransaction == null)
            {
                throw new InvalidOperationException("No active transaction to rollback.");
            }

            try
            {
                await _currentTransaction.RollbackAsync();
            }
            finally
            {
                await _currentTransaction.DisposeAsync();
                _currentTransaction = null;
            }
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
