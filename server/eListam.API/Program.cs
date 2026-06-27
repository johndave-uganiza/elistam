using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using Serilog;
using System.Text;
using eListam.Application.Services.Abstractions;
using eListam.Application.Services.Abstractions.Items;
using eListam.Application.Services.Abstractions.Products;
using eListam.Application.Services.Implementations;
using eListam.Domain.Models;
using eListam.Infrastructure.ExternalServices;
using eListam.Infrastructure.ExternalServices.Implementation;
using eListam.Infrastructure.Persistence;
using eListam.Infrastructure.Persistence.Repositories;
using eListam.Infrastructure.Seeders;
using eListam.Infrastructure.Storage;
using eListam.Application.Services.Abstractions.Auth;

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
builder.Services.AddScoped<DummyProductSeeder>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IDummyProductExternalService, DummyProductExternalService>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IFileStorage, FileStorage>();
#endregion

#region Application Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IProductService, ProductService>();
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

#region Seeders
// "using" statement ensures that DI scope is properly disposed
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

app.UseExceptionHandler(appBuilder =>
{
    appBuilder.Run(async context =>
    {
        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
        var exception = exceptionHandlerFeature?.Error;

        Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Information()
        .WriteTo.Console()
        .WriteTo.File(
            path: "logs/app-.log",
            rollingInterval: RollingInterval.Day,
            retainedFileCountLimit: 7)
        .CreateLogger();

        Log.Information(exception, exception?.Message ?? string.Empty);

        var (statusCode, message) = exception switch
        {
            ArgumentNullException => (StatusCodes.Status400BadRequest, "A required value was missing."),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "You are not authorized to access this resource."),
            KeyNotFoundException => (StatusCodes.Status404NotFound, "The requested resource was not found."),
            InvalidOperationException => (StatusCodes.Status409Conflict, "The current state has a conflict."),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred.")
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        await context.Response.WriteAsJsonAsync(new { statusCode, message });
    });
});

app.UseHttpsRedirection();
app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("*"));
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
