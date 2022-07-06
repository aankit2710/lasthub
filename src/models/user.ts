import { ObjectId } from "mongodb";

// we are storing it in out DB
export class User {
  constructor(
    public id: ObjectId,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,

    public createdAt: Date,
    public updatedAt: Date,
    public createdBy: string,
    public updatedBy: string,

    public image?: string,
    public mobileNumber?: string,
 
  ) {}
}

// will take from frontend
export class CreateUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public confirmPassword: string,
    public mobileNumber?: string,
    public image?: string,
  ) {}
}

// will take from frontend
export class SignInUser {
  constructor(
    public email: string,
    public password: string,
  ) {}
}
