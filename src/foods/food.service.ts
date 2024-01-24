import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './food.entity';
import { CreateFoodDto } from './create-food.dto';
import { MongoError } from 'mongodb';

@Injectable()
export class FoodService {
    constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

    async addFood(createFoodDto: CreateFoodDto): Promise<Food> {
        try {
            const newFood = new this.foodModel(createFoodDto);
            return await newFood.save();
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000) {
                throw new ConflictException('An food with the same name already exists.');
            }
            throw error;
        }
    }

    async findAll(): Promise<Food[]> {
        return this.foodModel.find().exec();
    }

    async updateFood(id: string, foodData: Food): Promise<Food> {
        const updatedFood = await this.foodModel.findByIdAndUpdate(id, foodData, { new: true });
        if (!updatedFood) {
            throw new NotFoundException('Food not found');
        }
        return updatedFood;
    }

    async deleteFood(id: string): Promise<any> {
        const deletedFood = await this.foodModel.findByIdAndDelete(id);
        if (!deletedFood) {
            throw new NotFoundException('Food not found');
        }
        return { deleted: true };
    }
}
