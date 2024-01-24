import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray,IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsArray()
  @IsOptional()
  houses?: Types.ObjectId[];

   @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

}