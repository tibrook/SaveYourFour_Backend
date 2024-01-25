// house.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from './schemas/house.schema';
import { CategorySchema } from './category.entity';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'House', schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]) // Ajout du schéma Category
  ],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [MongooseModule]
})
export class HouseModule {}
