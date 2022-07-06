import { ObjectId } from "mongodb";

export class Enquiry {
  constructor(
    public name: string,
    public body: string,
    public subject: string,
    
    public createdAt: Date,
    public updatedAt: Date,

    public createdBy: string,
    public updatedBy: string,
    public id?: ObjectId,
  ) {}
}

export class CreateEnquiry {
  constructor(
    public name: string,
    public body: string,
    public subject: string,
    public role: string,
    public location: string,
    public pincode: string
  ) {}
}
