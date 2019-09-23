CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
	[FirstName] NVARCHAR(255) NOT NULL, 
    [LastName] NVARCHAR(255) NOT NULL, 
    [EmailAddress] NVARCHAR(255) NULL, 
    [Gender] NVARCHAR(10) NULL, 
    [Password] NVARCHAR(10) NULL
)
  