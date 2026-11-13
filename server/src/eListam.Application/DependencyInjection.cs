using eListam.Application.Services.Implementations;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Application.Services.Interfaces.Dashboards;
using eListam.Application.Services.Interfaces.Items;
using eListam.Application.Services.Interfaces.Orders;
using eListam.Application.Services.Interfaces.Products;
using eListam.Application.Services.Interfaces.Transactions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace eListam.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IDashboardService, DashboardService>();

            return services;
        }  
    }
}
