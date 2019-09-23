CREATE TABLE [dbo].[UserNotification](
	[NotificationId] [int] IDENTITY(1,1) NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
	[UserId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserNotification]  WITH CHECK ADD  CONSTRAINT [FK_PersonOrder] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[UserNotification] CHECK CONSTRAINT [FK_PersonOrder]
GO