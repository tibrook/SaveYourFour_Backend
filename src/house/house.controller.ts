import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import {HouseService} from './house.service';
import {CreateInventoryCategoryDto,UpdateInventoryCategoryDto } from './inventory.dto'
import express, {Request, Response} from 'express';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get('/:houseId/inventory/categories')
  async getAllInventoryCategories(@Param('houseId') houseId: string, @Res() res: Response) {
    try {
      console.log('House.controller - getAllInventoryCategories')
      const categories = await this.houseService.getAllInventoryCategories(houseId);
      if (categories) {
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK, 
          message: "Inventory categories successfully fetched",
          data: categories
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND, 
          message: "Inventory categories not found"
        });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An error occurred"
      });
    }
  }
  @Post('/:houseId/inventory/categories')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async addInventoryCategory(@Param('houseId') houseId: string, @Body() categoryData: CreateInventoryCategoryDto, @Res() res: Response) {
    try {
      const newCategory = await this.houseService.addInventoryCategory(houseId, categoryData.name);
      res.status(HttpStatus.CREATED).json({ message: "Category successfully created", data: newCategory });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error: error.message });
    }
  }

  @Put('/:houseId/inventory/categories/:oldCategoryName')
  async updateInventoryCategory(@Param('houseId') houseId: string, @Param('oldCategoryName') oldCategoryName: string, @Body() categoryData: UpdateInventoryCategoryDto, @Res() res: Response) {
    try {
      const updatedCategory = await this.houseService.updateInventoryCategory(houseId, categoryData.oldName, categoryData.newName);
      res.status(HttpStatus.OK).json({ message: "Category successfully updated", data: updatedCategory });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error: error.message });
    }
  }

  @Delete('/:houseId/inventory/categories/:categoryName')
  async deleteInventoryCategory(@Param('houseId') houseId: string, @Param('categoryName') categoryName: string, @Res() res: Response) {
    try {
      const result = await this.houseService.deleteInventoryCategory(houseId, categoryName);
      res.status(HttpStatus.OK).json({ message: "Category successfully deleted", data: result });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred", error: error.message });
    }
  }
  
}