using eListam.Application.Services.Interfaces;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Application.Services.Interfaces.Dashboards;
using eListam.Application.Services.Interfaces.Items;
using eListam.Application.Services.Interfaces.Orders;
using eListam.Application.Services.Interfaces.Transactions;
using eListam.Domain.Models.Entities;
using eListam.Infrastructure.Generators;
using eListam.Infrastructure.Integrations.DummyApi.Implementation;
using eListam.Infrastructure.Integrations.DummyApi.Interface;
using eListam.Infrastructure.Persistence;
using eListam.Infrastructure.Persistence.Data;
using eListam.Infrastructure.Persistence.Data.Seeders;
using eListam.Infrastructure.Persistence.Repositories;
using eListam.Infrastructure.Persistence.Repositories.Generics;
using eListam.Infrastructure.Storage;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace eListam.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options => options
                .UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddHttpClient();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IdentitySeeder>();
            services.AddScoped<DummyProductSeeder>();
            services.AddScoped<IDummyProductExternalService, DummyProductExternalService>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IFileStorage, FileStorage>();
            services.AddScoped<IDashboardRepository, DashboardRepository>();
            services.AddScoped<IDocumentNumberGenerator, DocumentNumberGenerator>();

            return services;
        }
    }
}
