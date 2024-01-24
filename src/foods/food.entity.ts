import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsNotEmpty, IsBoolean, IsDate, IsString } from 'class-validator';

@Schema()
export class Food extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'House' })
    houseId: Types.ObjectId;
    
    @IsNotEmpty()
    @IsString()
    @Prop({ required: true, unique: true  })
    name: string;

    @IsString()
    @Prop()
    description: string;

    @IsString()
    @Prop({ required: true })
    type: string;

    @IsString()
    @Prop()
    quantity: string;

    @IsString()
    @Prop()
    location: string;

    @IsBoolean()
    @Prop()
    favorite: boolean;

    @IsDate()
    @Prop()
    expirationDate: Date;

    @IsDate()
    @Prop()
    bestBeforeDate: Date;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
