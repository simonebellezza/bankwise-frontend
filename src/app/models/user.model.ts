import { AccountResponse } from "./account.model";

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  accounts: AccountResponse[];
}

export interface UserRegisterDTO {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}
