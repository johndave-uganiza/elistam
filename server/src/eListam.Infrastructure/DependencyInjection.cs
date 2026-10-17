using eListam.Application.Common.Interfaces;
using eListam.Application.Services.Abstractions.Auth;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Abstractions.Orders;
using eListam.Application.Services.Abstractions.Products;
using eListam.Application.Services.Abstractions.Transactions;
using eListam.Domain.Models;
using eListam.Infrastructure.Integrations.DummyApi.Implementation;
using eListam.Infrastructure.Integrations.DummyApi.Interface;
using eListam.Infrastructure.Persistence;
using eListam.Infrastructure.Persistence.Repositories;
using eListam.Infrastructure.Persistence.Seeders;
using eListam.Infrastructure.Storage;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace eListam.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options => options
                .UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddHttpClient();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IdentitySeeder>();
            services.AddScoped<DummyProductSeeder>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDummyProductExternalService, DummyProductExternalService>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IFileStorage, FileStorage>();
            
            return services;
        }
    }
}
