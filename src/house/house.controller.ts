import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Res } from '@nestjs/common';
import {HouseService} from './house.service';
import {CreateInventoryCategoryDto,UpdateInventoryCategoryDto } from './inventory.dto'
import express, {Request, Response} from 'express';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get('/:houseId/inventory/categories')
  async getAllInventoryCategories(@Param('houseId') houseId: string, @Res() res: Response) {
    try {
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
    // @Post('/:houseId/inventory/categories')
    // async addInventoryCategory(@Param('houseId') houseId: string, @Body() categoryData: CreateInventoryCategoryDto, @Res() res: Response) {
    //   try {
    //     const newCategory = await this.houseService.addInventoryCategory(houseId, categoryData.name, categoryData.description);
    //     if (newCategory) {
    //       res.status(HttpStatus.CREATED).json({ message: "Category successfully created", data: newCategory });
    //     } else {
    //       res.status(HttpStatus.BAD_REQUEST).json({ message: "Category could not be created" });
    //     }
    //   } catch (error) {
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    //   }
    // }

    // @Put('/:houseId/inventory/categories/:id')
    // async updateInventoryCategory(@Param('houseId') houseId: string, @Param('id') id: string, @Body() categoryData: UpdateInventoryCategoryDto, @Res() res: Response) {
    //   try {
    //     const updatedCategory = await this.houseService.updateInventoryCategory(houseId, id, categoryData.name, categoryData.description);
    //     if (updatedCategory) {
    //       res.status(HttpStatus.OK).json({ message: "Category successfully updated", data: updatedCategory });
    //     } else {
    //       res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found" });
    //     }
    //   } catch (error) {
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    //   }
    // }

    // @Delete('/:houseId/inventory/categories/:id')
    // async deleteInventoryCategory(@Param('houseId') houseId: string, @Param('id') id: string, @Res() res: Response) {
    //   try {
    //     const result = await this.houseService.deleteInventoryCategory(houseId, id);
    //     if (result) {
    //       res.status(HttpStatus.OK).json({ message: "Category successfully deleted" });
    //     } else {
    //       res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found" });
    //     }
    //   } catch (error) {
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    //   }
    // }
}