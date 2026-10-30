CREATE OR ALTER PROCEDURE dbo.GenerateDocumentNumber
    @Prefix NVARCHAR(10),
    @DocumentNumber NVARCHAR(30) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @NextNumber BIGINT;

    IF NULLIF(LTRIM(RTRIM(@Prefix)), N'') IS NULL
    BEGIN
        THROW 50001, 'Document prefix is required.', 1;
    END;

    BEGIN TRY
        BEGIN TRANSACTION;

        SELECT @NextNumber = LastNumber
        FROM dbo.DocumentNumberSequences
            WITH (UPDLOCK, HOLDLOCK)
        WHERE Prefix = @Prefix;

        IF @NextNumber IS NULL
        BEGIN
            SET @NextNumber = 1;

            INSERT INTO dbo.DocumentNumberSequences
                (Prefix, LastNumber)
            VALUES
                (@Prefix, @NextNumber);
        END
        ELSE
        BEGIN
            SET @NextNumber = @NextNumber + 1;

            UPDATE dbo.DocumentNumberSequences
            SET LastNumber = @NextNumber
            WHERE Prefix = @Prefix;
        END;

        -- Document number: 1, 2, 3, 4...
        SET @DocumentNumber =
			CONCAT(@Prefix, N'-', @NextNumber);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO