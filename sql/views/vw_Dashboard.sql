CREATE OR ALTER VIEW dbo.vw_Dashboard
AS
	SELECT
		YEAR(T.[Date]) AS [YEAR]
		,COALESCE(SUM(TD.Quantity * I.Price), 0) AS REVENUE
		,COALESCE(SUM(TD.Quantity * I.Cost), 0) AS COGS
		,COALESCE(SUM(TD.Quantity * (I.Price - I.Cost)), 0) AS GROSS
		,COALESCE(SUM(TD.Quantity * (I.Price - I.Cost)), 0) AS NET
		,CAST(0 AS DECIMAL(18,2)) AS OPEX
	FROM TransactionDetails TD
	INNER JOIN Transactions T ON TD.TransactionId = T.Id
	INNER JOIN Items I ON TD.ItemId = I.Id
	WHERE T.[Date] >= DATEFROMPARTS(YEAR(GETDATE()), 1, 1)
		AND T.[Date] < DATEFROMPARTS(YEAR(GETDATE()) + 1, 1, 1)
	GROUP BY YEAR(T.[Date]);
GO