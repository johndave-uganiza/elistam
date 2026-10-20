using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Interfaces
{
    public interface IUnitOfWork
    {
        public Task BeginTransactionAsync();
        public Task CommitTransactionAsync();
        public Task RollbackTransactionAsync();
        public Task SaveChangesAsync();
    }
}
