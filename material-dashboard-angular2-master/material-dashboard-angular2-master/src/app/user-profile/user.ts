export class User {
    Id: number;
    FirstName: string;
    LastName: string;
    Gender: string;
    EmailAddress: string;
    Password:string;
    UserNotification:[
        {
          NotificationId: number;
          Message: string;
          UserId: number;
          User: {};
        }
      ]
  }

 