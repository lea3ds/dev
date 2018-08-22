/*
DROP TABLE [dbo].[AccountValidationSignin]
DROP TABLE [dbo].[AccountValidationRecovery]
DROP TABLE [dbo].[AccountPassword]
DROP TABLE [dbo].[AccountUser]
*/

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'AccountUser')
	CREATE TABLE [dbo].[AccountUser] (
		[Id]					BIGINT			NOT NULL	IDENTITY (1, 1),
		[Name]					VARCHAR (255)	NOT NULL,
		[Mail]					VARCHAR (255)	NOT NULL,
		[Disabled]				BIT				NOT NULL,
		PRIMARY KEY CLUSTERED ([Id] ASC),
	);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'AccountPassword')
	CREATE TABLE [dbo].[AccountPassword]
	(
		[UserId]				BIGINT			NOT NULL,
		[Hash]					VARCHAR(255)	NOT NULL,
		[Salt]					VARCHAR(255)	NOT NULL,
		[Iterations]			INT				NOT NULL,
		[Attempts]				INT				NOT NULL,
		PRIMARY KEY ([UserId]),
		CONSTRAINT [FK_Password_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AccountUser]([Id]),
	)

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'AccountValidationSignin')
	CREATE TABLE [dbo].[AccountValidationSignin] (
		[Id]					VARCHAR (255)	NOT NULL,
		[InsertionTimeStamp]    DATETIME		NOT NULL,
		[ExpirationTime]		DATETIME		NOT NULL,
		[ValidationTimeStamp]   DATETIME		NULL,
		PRIMARY KEY CLUSTERED ([Id] ASC),
	);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'AccountValidationRecovery')
	CREATE TABLE [dbo].[AccountValidationRecovery] (
		[Id]					VARCHAR (255)	NOT NULL,
		[InsertionTimeStamp]    DATETIME		NOT NULL,
		[ExpirationTime]		DATETIME		NOT NULL,
		[ValidationTimeStamp]   DATETIME		NULL,
		[UserId]				BIGINT			NOT NULL,
		PRIMARY KEY CLUSTERED ([Id] ASC),
		CONSTRAINT [FK_ValidationRecovery_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AccountUser]([Id]),
	);