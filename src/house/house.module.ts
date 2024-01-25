// house.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from './schemas/house.schema';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'House', schema: HouseSchema }]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [MongooseModule, HouseService]
})
export class HouseModule {}
