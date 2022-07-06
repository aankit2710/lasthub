import { collections } from "../config/database";
import { CreateEnquiry, Enquiry } from "../models/enquiry";

export class EnquiryMongoDb {
    db: any;
    constructor() { 

       this.db = collections.db.collection('enquiry')
    }

    async create(enquiryObject: CreateEnquiry) {

        let newEnquiry: any;
        newEnquiry = await this.db.insertOne({
            name: enquiryObject.name,
            body: enquiryObject.body,
            subject: enquiryObject.subject,
            role: enquiryObject.role,
            location: enquiryObject.location,
            pincode: enquiryObject.pincode,
            createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' }),
            createdBy: "Admin",
        });
        newEnquiry = await this.getByKey({ _id: newEnquiry.insertedId })
        return newEnquiry
    }
    async getByKey(key: any) {
        const enquiry = await this.db.findOne(key);
        return enquiry;
    }

    async getAll() {
        const enquiries = await this.db.find({}).sort ( { createdAt : -1 } ).toArray();
        return enquiries;
    }
}