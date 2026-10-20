using eListam.Application.DTOs.Dashboard;
using eListam.Application.Services.Interfaces.Items;
using eListam.Domain.Models.Entities;
using eListam.Infrastructure.Persistence.Data;
using eListam.Infrastructure.Persistence.Repositories.Generics;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Repositories
{
    public class ItemRepository : GenericRepository<Item>, IItemRepository
    {
        private readonly ApplicationDbContext _db;
        public ItemRepository(ApplicationDbContext db) : base(db) 
        {
            _db = db;
        }
    }
}
