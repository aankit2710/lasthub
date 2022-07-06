import { HTTPErrorHandler } from "../services/errorHandler";
import { EnquiryService } from "../services/enquiry";

import { JsonController, Get, Post, Body, HttpCode } from "routing-controllers";
import { EnquiryInputDTO } from "../dto/enquiry";
import { Enquiry, CreateEnquiry } from "../models/enquiry";

@JsonController("/enquiry")
export class EnquiryController {
    enquiryServiceObj: any;
    httpError: any;
    constructor() {
        this.enquiryServiceObj = new EnquiryService();
        this.httpError = new HTTPErrorHandler();
    }

    @HttpCode(201)
    @Post("/")
    async addEnquiry(@Body({ required: true }) enquiryRequest: EnquiryInputDTO): Promise<any> {
        const EnquiryObject: any = await this.enquiryServiceObj.addEnquiry(enquiryRequest);
        return EnquiryObject;
    }

    @HttpCode(200)
    @Get("/")
    async getEnquiry(): Promise<any> {
        const EnquiryObject: any = await this.enquiryServiceObj.getEnquiry();
        return EnquiryObject;
    }
}