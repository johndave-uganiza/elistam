using eListam.Application.Services.Interfaces;
using eListam.Domain.Constants;
using eListam.Infrastructure.Persistence.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace eListam.Infrastructure.Generators;

public class DocumentNumberGenerator: IDocumentNumberGenerator
{
    private readonly ApplicationDbContext _db;

    public DocumentNumberGenerator(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<string> GenerateDocumentNumberAsync(
        DocumentType documentType)
    {
        var prefixParameter = new SqlParameter(
            "@Prefix",
            SqlDbType.NVarChar,
            10)
        {
            Value = documentType.GetPrefix()
        };

        var numberParameter = new SqlParameter(
            "@DocumentNumber",
            SqlDbType.NVarChar,
            30)
        {
            Direction = ParameterDirection.Output
        };

        await _db.Database.ExecuteSqlRawAsync(
            """
            EXEC dbo.GenerateDocumentNumber
                @Prefix = @Prefix,
                @DocumentNumber = @DocumentNumber OUTPUT
            """,
            prefixParameter,
            numberParameter);

        return numberParameter.Value?.ToString()
            ?? throw new InvalidOperationException(
                "Failed to generate document number.");
    }
}