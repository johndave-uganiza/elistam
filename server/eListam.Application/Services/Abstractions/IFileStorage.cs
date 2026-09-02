using eListam.Application.DTOs.Items;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Abstractions
{
    public interface IFileStorage
    {
        public Task<string> SaveImageAsync(IFormFile image);
    }
}
