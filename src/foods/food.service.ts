import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Food } from './food.entity';
import { CreateFoodDto } from './create-food.dto';
import { MongoError } from 'mongodb';

@Injectable()
export class FoodService {

    // Inject the Mongoose model for 'Food'. This allows interactions with the 'Food' collection in the MongoDB database.
    constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

    // Method to add a new food item. It takes a DTO (Data Transfer Object) as input, which is validated before reaching this point.
    async addFood(createFoodDto: CreateFoodDto, houseId: string): Promise<Food> {
        try {
            const newFood = new this.foodModel({
                ...createFoodDto,
                houseId: new Types.ObjectId(houseId) 
            });
            return await newFood.save();
        } catch (error) {
             // Handle MongoDB duplicate key error (error code 11000). This occurs when a food item with an existing name is added.
            if (error instanceof MongoError && error.code === 11000) {
                throw new ConflictException('A food with the same name already exists.');
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
