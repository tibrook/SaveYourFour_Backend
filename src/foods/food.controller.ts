import { Controller,UseGuards, Post, Get, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from './food.entity';
import { CreateFoodDto } from './create-food.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
export interface CustomRequest extends Request {
    user: any; 
}

@Controller('foods')
export class FoodController {
    constructor(private foodService: FoodService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addFood(@Body() createFoodDto: CreateFoodDto, @Req() req: CustomRequest): Promise<Food> {
        const userId = req.user.userId;
        return this.foodService.addFood(createFoodDto, userId);
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
