import { collections } from "../config/database";
import { CreateUser, User } from "../models/user";

export class UserMongoDb {
    db: any;
    constructor() { 

       this.db = collections.db.collection('User')
    }

    async create(userRegisterObject: CreateUser) {

        let newUser: any;
        
        newUser = await this.db.insertOne({
            name: userRegisterObject.firstName,
            lastName: userRegisterObject.lastName,
            email: userRegisterObject.email,
            mobileNumber: userRegisterObject.mobileNumber,
            password: userRegisterObject.password,
            image: userRegisterObject.image,
            createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' }),
            createdBy: "Admin",
        });
        newUser = await this.getByKey({ _id: newUser.insertedId })
        return newUser
    }

    async getByKey(key: any) {
        const user = await this.db.findOne(key);
        return user;
    }
}