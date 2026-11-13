CREATE TABLE dbo.DocumentNumberSequences
(
    Prefix NVARCHAR(10) NOT NULL
        CONSTRAINT PK_DocumentNumberSequences
        PRIMARY KEY,

    LastNumber BIGINT NOT NULL
        CONSTRAINT DF_DocumentNumberSequences_LastNumber
        DEFAULT (0)
);
GO