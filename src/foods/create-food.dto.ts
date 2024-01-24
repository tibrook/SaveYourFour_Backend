import { IsNotEmpty, IsBoolean, IsDateString, IsString  } from 'class-validator';
import { Types } from 'mongoose';
export class CreateFoodDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    houseId: Types.ObjectId; 

    @IsString()
    description: string;

    @IsString()
    type: string;

    @IsString()
    quantity: string;

    @IsString()
    location: string;

    @IsBoolean()
    favorite: boolean;

    @IsDateString()
    expirationDate: Date;

    @IsDateString()
    bestBeforeDate: Date;
}
