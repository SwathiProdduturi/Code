export class User {
    Id: number;
    FirstName: string;
    LastName: string;
    Gender: string;
    EmailAddress: string;
    Password:string;
    UserNotifications:[
        {
          NotificationId: number;
          Message: string;
          UserId: number;
        }
      ]
  }

 