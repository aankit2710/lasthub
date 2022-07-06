import {
    IsString,
    IsNotEmpty,
    IsOptional
  } from 'class-validator';
  
  export class EnquiryInputDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsOptional()
    role: string;
    
    @IsString()
    @IsOptional()
    location: string;

    @IsString()
    @IsOptional()
    pincode?: string;
  }