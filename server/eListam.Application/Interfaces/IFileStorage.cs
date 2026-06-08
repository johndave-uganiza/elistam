using eListam.Application.DTOs.Items;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Interfaces
{
    public interface IFileStorage
    {
        public Task SaveImageAsync(IFormFile image);
    }
}
