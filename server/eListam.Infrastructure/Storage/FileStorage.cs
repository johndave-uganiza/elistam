using System;
using System.Collections.Generic;
using System.Text;
using eListam.Application.Interfaces;
using eListam.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace eListam.Infrastructure.Storage
{
    public class FileStorage : IFileStorage
    {
        private readonly IWebHostEnvironment _env;
        public FileStorage(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task SaveImageAsync(IFormFile image)
        {
            if (image != null)
            {
                // Combine wwwroot and images path --> wwwroot/images
                var folderPath = Path.Combine(_env.WebRootPath, "images");
                // Create images folder if it doesn't exists
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                // Combine images path and image filename
                var filePath = Path.Combine(folderPath, image.FileName);

                // Check if the file path exists
                if (System.IO.File.Exists(filePath))
                {
                    // Delete file path to create new one after
                    System.IO.File.Delete(filePath);
                }

                // Upload file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }
        }
    }
}
