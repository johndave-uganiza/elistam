using System;
using System.Collections.Generic;
using System.Text;

namespace eListam.Domain.Constants
{
    public enum DocumentType
    {
        Order,
        Transaction,
    }

    public static class DocumentTypeExtensions
    {
        public static string GetPrefix(this DocumentType type)
        {
            return type switch
            {
                DocumentType.Order => "ORD",
                DocumentType.Transaction => "TRX",
                _ => throw new ArgumentOutOfRangeException(nameof(type))
            };
        }
    }
}
