export class User {
  UserId: number;
  FirstName: string;
  LastName: string;
  ContactNumber: string;
  Username: string;
  Password: string;

  constructor(
    UserId: number,
    FirstName: string,
    LastName: string,
    ContactNumber: string,
    Username: string,
    Password: string
  ) {
    this.UserId = UserId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.ContactNumber = ContactNumber;
    this.Username = Username;
    this.Password = Password;
  }
}
