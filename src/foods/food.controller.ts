import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from './food.entity';
import { CreateFoodDto } from './create-food.dto';

@Controller('foods')
export class FoodController {
    constructor(private foodService: FoodService) {}

    @Post()
    async addFood(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        return this.foodService.addFood(createFoodDto);
    }

    @Get()
    async getAllFoods(): Promise<Food[]> {
        return this.foodService.findAll();
    }

    @Put(':id')
    async updateFood(@Param('id') id: string, @Body() foodData: Food): Promise<Food> {
        return this.foodService.updateFood(id, foodData);
    }

    @Delete(':id')
    async deleteFood(@Param('id') id: string): Promise<any> {
        return this.foodService.deleteFood(id);
    }
}
