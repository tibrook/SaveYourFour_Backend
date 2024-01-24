import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './food.entity';
import { CreateFoodDto } from './create-food.dto';

@Injectable()
export class FoodService {
    constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

    async addFood(createFoodDto: CreateFoodDto): Promise<Food> {
        const newFood = new this.foodModel(createFoodDto);
        return newFood.save();
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
