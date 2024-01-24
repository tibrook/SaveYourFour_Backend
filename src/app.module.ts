import './config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './foods/food.module';


@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    UsersModule, AuthModule,FoodModule
  ],
  // ... controllers, providers
})
export class AppModule {}
