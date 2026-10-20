using eListam.Application.Services.Implementations;
using eListam.Application.Services.Interfaces;
using eListam.Application.Services.Interfaces.Auth;
using eListam.Application.Services.Interfaces.Dashboards;
using eListam.Application.Services.Interfaces.Items;
using eListam.Application.Services.Interfaces.Orders;
using eListam.Application.Services.Interfaces.Products;
using eListam.Application.Services.Interfaces.Transactions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
          
            services.AddHttpContextAccessor();

            // Get JWT secret key from appsettings.json
            var key = configuration.GetValue<string>("Jwt:SecretKey");

            // Configure Jwt Authentication
            services.AddAuthentication(u =>
            {
                u.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                u.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(u =>
            {
                u.RequireHttpsMetadata = false;
                u.SaveToken = true;
                u.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                };
            });

            // Configure global Authorization
            services.AddControllers(options =>
            {
                var authorizationPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                options.Filters.Add(new AuthorizeFilter(authorizationPolicy));
            });

            return services;
        }  
    }
}
