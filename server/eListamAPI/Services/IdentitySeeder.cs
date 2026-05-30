using Azure.Core;
using eListamAPI.Constants;
using eListamAPI.Data;
using eListamAPI.DTOs.Auth;
using eListamAPI.Models;
using eListamAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace eListamAPI.Services
{
    public class IdentitySeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        public  IdentitySeeder(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, 
            IConfiguration config
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
        }

        #region SeedAsync
        public async Task SeedAsync()
        {
            var adminData = new UserData(
                _config["SeedUsers:AdminUserName"]!,
                 _config["SeedUsers:AdminEmail"]!,
                 _config["SeedUsers:AdminPassword"]!,
                 Role.Admin
                );

            var demoData = new UserData(
                _config["SeedUsers:DemoUserName"]!,
                 _config["SeedUsers:DemoEmail"]!,
                 _config["SeedUsers:DemoPassword"]!,
                 Role.Demo
                );

            await CreateUserAsync(adminData);
            await CreateUserAsync(demoData);
        }
        #endregion

        #region CreateUserAsync
        private async Task CreateUserAsync(UserData userData)
        {
            if (await _userManager.FindByEmailAsync(userData.Email) != null) return;
            
            var user = new ApplicationUser()
            {
                UserName = userData.UserName,
                Email = userData.Email,
                NormalizedUserName = userData.UserName?.ToUpper(),
                NormalizedEmail = userData.Email?.ToUpper()
            };

            var result = await _userManager.CreateAsync(user, userData.Password);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create user: {string.Join(", ", result.Errors)}");
            }

            if (!await _roleManager.RoleExistsAsync(Role.Admin))
            {
                await _roleManager.CreateAsync(new IdentityRole(Role.Admin));
            }

            if (!await _roleManager.RoleExistsAsync(Role.Demo))
            {
                await _roleManager.CreateAsync(new IdentityRole(Role.Demo));
            }

            if (userData.Role!.Equals(Role.Admin, StringComparison.CurrentCultureIgnoreCase))
            {
                await _userManager.AddToRoleAsync(user, Role.Admin);
            }

            if (userData.Role!.Equals(Role.Demo, StringComparison.CurrentCultureIgnoreCase))
            {
                await _userManager.AddToRoleAsync(user, Role.Demo);
            }
        }
        #endregion
    }
}


//public class DatabaseInitializer
//{
//    public async Task InitializeAsync(IServiceProvider services)
//    {
//        using var scope = services.CreateScope();

//        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

//        await db.Database.MigrateAsync();

//        var identitySeeder = scope.ServiceProvider.GetRequiredService<IdentitySeeder>();
//        await identitySeeder.SeedAsync();

//        var appSeeder = scope.ServiceProvider.GetRequiredService<ApplicationDbSeeder>();
//        await appSeeder.SeedAsync();
//    }
//}

//await app.Services.GetRequiredService<DatabaseInitializer>()
//    .InitializeAsync(app.Services);