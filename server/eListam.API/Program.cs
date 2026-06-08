using eListam.Infrastructure.Persistence;
using eListam.Infrastructure.ExternalServices;
using eListam.Infrastructure.ExternalServices.Implementation;
using eListam.Infrastructure.Seeders;
using eListam.Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using eListam.Infrastructure.Storage;
using eListam.Application.Services.Interface;
using eListam.Application.Interfaces;
using eListam.Application.Services;
using eListam.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add ApplicationDbContext in the container and configure database options
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add Identity System in the container
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Add HttpClient service
builder.Services.AddHttpClient();

#region Infrastructure Services
builder.Services.AddScoped<IdentitySeeder>();
builder.Services.AddScoped<IDummyProductExternalService, DummyProductExternalService>();
builder.Services.AddScoped<DummyProductSeeder>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IFileStorage, FileStorage>();
#endregion

#region Application Services
builder.Services.AddScoped<IItemService, ItemService>();
#endregion

#region Auth Services
// Get JWT secret key from appsettings.json
var key = builder.Configuration.GetValue<string>("Jwt:SecretKey");

// Configure Jwt Authentication
builder.Services.AddAuthentication(u =>
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
builder.Services.AddControllers(options =>
{
    var authorizationPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();

    options.Filters.Add(new AuthorizeFilter(authorizationPolicy));
});
#endregion

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

#region Seeder
//using statement ensures that DI scope is properly disposed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    await db.Database.MigrateAsync();

    if (await db.Database.CanConnectAsync())
    {
        // Seed Identity
        await scope.ServiceProvider
            .GetRequiredService<IdentitySeeder>()
            .SeedAsync();

        // Seed Dummy Products
        await scope.ServiceProvider
            .GetRequiredService<DummyProductSeeder>()
            .SeedAsync();
    }
}
#endregion

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("*"));
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
