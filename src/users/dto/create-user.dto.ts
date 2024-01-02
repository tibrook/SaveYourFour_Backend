import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

   @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
}