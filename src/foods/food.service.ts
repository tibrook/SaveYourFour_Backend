import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
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
                houseId,
            });
            return await newFood.save();
        } catch (error) {
            console.error('Error in food creation:', error);
        if (error.code === 11000) {
            throw new ConflictException(`A food with the name "${createFoodDto.name}" already exists in the specified house.`);
        } else {
            throw new InternalServerErrorException('Error.');
        }
        }
    }

    async findAllByHouse(houseId: string): Promise<Food[]> {
        return this.foodModel.find({ houseId: houseId }).exec(); 
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
