export interface LoginResponse {
  token: string;
}

export interface User {
  userid: number;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  aadhaar: string;
  mobilenumber: string;
}

export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}
