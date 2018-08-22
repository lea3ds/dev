
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'IncomeCategory')
CREATE TABLE [dbo].[IncomeCategory] (
    [id]       INT          IDENTITY (1, 1) NOT NULL,
    [name]     VARCHAR (20) NOT NULL,
    [disabled] BIT          NOT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
);


IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'PaymentCategory')
CREATE TABLE [dbo].[PaymentCategory] (
    [id]       INT          IDENTITY (1, 1) NOT NULL,
    [name]     VARCHAR (20) NOT NULL,
    [disabled] BIT          NOT NULL,
	PRIMARY KEY CLUSTERED ([id] ASC),
);



IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'OperationType')
CREATE TABLE [dbo].[OperationType] (
    [id]   INT          NOT NULL,
    [name] VARCHAR (50) NULL,
	PRIMARY KEY CLUSTERED ([id] ASC),
);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'WaytopayType')
CREATE TABLE [dbo].[WaytopayType] (
    [id]       INT          IDENTITY (1, 1) NOT NULL,
    [name]     VARCHAR (20) NOT NULL,
    [disabled] BIT          NOT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Waytopay')
CREATE TABLE [dbo].[Waytopay] (
    [id]       INT          IDENTITY (1, 1) NOT NULL,
    [name]     VARCHAR (20) NOT NULL,
    [disabled] BIT          NOT NULL,
    [typeId]   INT          NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Waytopay_WaytopayType] FOREIGN KEY ([typeId]) REFERENCES [dbo].[WaytopayType] ([id])
);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'VersionTable')
CREATE TABLE [dbo].[VersionTable] (
    [key]     VARCHAR (50) NOT NULL,
    [version] BIGINT       DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([key] ASC)
);
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Payment')
CREATE TABLE [dbo].[Payment] (
    [id]         INT           IDENTITY (1, 1) NOT NULL,
    [date]       DATETIME      NULL,
    [detail]     VARCHAR (250) NOT NULL,
    [categoryId] INT           NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
	CONSTRAINT [FK_Payment_PaymentCategory] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[PaymentCategory] ([id])
);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'PaymentPending')
CREATE TABLE [dbo].[PaymentPending] (
    [paymentId]  INT             NOT NULL,
    [id]         INT             NOT NULL,
    [amount]     DECIMAL (18, 2) NOT NULL,
    [date]       DATETIME        NULL,
    [waytopayId] INT             NULL,
	PRIMARY KEY CLUSTERED ([paymentId] ASC, [id] ASC),
    CONSTRAINT [FK_PaymentPending_Payment] FOREIGN KEY ([paymentId]) REFERENCES [dbo].[Payment] ([id]),
    CONSTRAINT [FK_PaymentPending_Waytopay] FOREIGN KEY ([waytopayId]) REFERENCES [dbo].[Waytopay] ([id])
);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Income')
CREATE TABLE [dbo].[Income] (
    [id]         INT           IDENTITY (1, 1) NOT NULL,
    [date]       DATETIME      NULL,
    [detail]     VARCHAR (250) NOT NULL,
    [categoryId] INT           NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Income_IncomeCategory] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[IncomeCategory] ([id])
);

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = '[IncomePending')
CREATE TABLE [dbo].[IncomePending] (
    [incomeId]   INT             NOT NULL,
    [id]         INT             NOT NULL,
    [amount]     DECIMAL (18, 2) NOT NULL,
    [date]       DATETIME        NULL,
    [waytopayId] INT             NULL,
	PRIMARY KEY CLUSTERED ([incomeId] ASC, [id] ASC),
    CONSTRAINT [FK_IncomePending_Income] FOREIGN KEY ([incomeId]) REFERENCES [dbo].[Income] ([id]),
    CONSTRAINT [FK_IncomePending_Waytopay] FOREIGN KEY ([waytopayId]) REFERENCES [dbo].[Waytopay] ([id])
);

