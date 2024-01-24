import { IsNotEmpty, IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreateFoodDto {
    @IsNotEmpty()
    @IsString()
    name: string;

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
