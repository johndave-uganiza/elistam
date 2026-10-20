
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Serilog;
using eListam.Infrastructure;
using eListam.Infrastructure.Persistence.Data.Seeders;
using eListam.Infrastructure.Persistence.Data;
using eListam.Application;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);

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

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("*"));
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
