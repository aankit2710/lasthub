import {
  Length,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsNotEmpty
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(10)
  @MinLength(6, { message: 'password is too short' })
  password: string;

  @IsString()
  @MaxLength(10)
  @MinLength(6, { message: 'password is too short' })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  @Length(10, 10, { message: 'Mobile number should be correct' })
  mobileNumber?: string;

  @IsString()
  @IsOptional()
  image?: string;

}

export class GetUserDTO {
  
  @IsEmail()
  email: string;
  
  @IsString()
  password: string;
}