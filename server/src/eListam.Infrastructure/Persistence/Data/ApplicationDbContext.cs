using eListam.Domain.Models.Entities;
using eListam.Domain.Models.ReadModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace eListam.Infrastructure.Persistence.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        #region Fields
        private const int _PRECISION = 18;
        private const int _PRICE_SCALE = 2;
        private const int _QUANTITY_SCALE = 3;
        #endregion

        #region Constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base (options)
        {
        }
        #endregion

        #region Entities
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionDetail> TransactionDetails { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        #endregion

        #region Overrides
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Tables
            #region Items
            modelBuilder.Entity<Item>(e =>
            {
                e.Property(p => p.Cost).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.Price).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.Stock).HasPrecision(_PRECISION, _QUANTITY_SCALE);
            });
            #endregion

            #region Orders
            modelBuilder.Entity<Order>(e =>
            {
                e.Property(p => p.TotalPrice).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.TotalQuantity).HasPrecision(_PRECISION, _QUANTITY_SCALE);
            });

            modelBuilder.Entity<OrderDetail>(e =>
            {
                e.Property(p => p.Price).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.Quantity).HasPrecision(_PRECISION, _QUANTITY_SCALE);
            });
            #endregion

            #region Transactions
            modelBuilder.Entity<Transaction>(e =>
            {
                e.Property(p => p.TotalPrice).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.TotalQuantity).HasPrecision(_PRECISION, _QUANTITY_SCALE);
            });

            modelBuilder.Entity<TransactionDetail>(e =>
            {
                e.Property(p => p.Price).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.Quantity).HasPrecision(_PRECISION, _QUANTITY_SCALE);
            });
            #endregion

            // Views
            #region Dashboard
            modelBuilder.Entity<Dashboard>(e =>
            {
                e.HasNoKey();

                e.ToView("vw_Dashboard");

                e.Property(p => p.Revenue).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.COGS).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.Gross).HasPrecision(_PRECISION, _PRICE_SCALE);
                e.Property(p => p.Net).HasPrecision(_PRECISION, _PRICE_SCALE);
                
            });
            #endregion

        }
        #endregion
    }
}
