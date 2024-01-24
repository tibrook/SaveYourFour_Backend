// house.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from './schemas/house.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'House', schema: HouseSchema }])
  ],
  // autres configurations...
  exports: [MongooseModule] // Assurez-vous d'exporter le MongooseModule
})
export class HouseModule {}
