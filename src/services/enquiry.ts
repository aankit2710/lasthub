import { CreateEnquiry } from "../models/enquiry";
import { EnquiryMongoDb } from "../database/enquiry.mongo";

export class EnquiryService {
    errorObj: any;
    enquiryDatabase: any;
    constructor() {
        this.enquiryDatabase = new EnquiryMongoDb();
    }

    async addEnquiry(enquiryObject: CreateEnquiry) {
        try {

            const newEnquiry = await this.enquiryDatabase.create(enquiryObject)
            newEnquiry._id = newEnquiry._id.toString();
            newEnquiry.createdAt= newEnquiry.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
            return newEnquiry;
        } catch {
            throw Error("Enquiry cannot be Sent");
        }
    }

    async getEnquiry() {
        try {
            const allEnquiry = await this.enquiryDatabase.getAll();
            console.log(allEnquiry);
            return allEnquiry;
        } catch {
            throw Error("Error in fetching the enquiry");
        }
    }
}