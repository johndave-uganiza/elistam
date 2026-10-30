using eListam.Domain.Constants;
using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Application.Services.Interfaces.Common
{
    public interface IDocumentNumberGenerator
    {
        public Task<string> GenerateDocumentNumberAsync(DocumentType documentType);
    }
}
