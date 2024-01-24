import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Food, FoodSchema } from './food.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }])],
    controllers: [FoodController],
    providers: [FoodService],
})
export class FoodModule {}
