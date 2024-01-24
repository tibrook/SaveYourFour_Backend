import { IsNotEmpty, IsBoolean, IsDate, IsString } from 'class-validator';

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

    @IsDate()
    expirationDate: Date;

    @IsDate()
    bestBeforeDate: Date;
}
