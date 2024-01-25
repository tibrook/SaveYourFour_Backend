import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House } from './house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel('House') private readonly houseModel: Model<House>,
  ) {}

   async getAllInventoryCategories(houseId: string): Promise<House[]> {
    return await this.houseModel.findById(houseId).populate('categories');
  }
  async createHouse(userId: string): Promise<House> {
    const defaultCategories = [
      'Fruits & Légumes', 'Viandes & Poissons', 'Produits Laitiers', 
      'Céréales & Féculents', 'Épices & Condiments', 'Produits Secs', 
      'Conserves & Bocaux', 'Boissons'
    ];
    const newHouse = new this.houseModel({
      name: 'Default House',
      users: [userId],
      inventoryCategory: defaultCategories
    });
    console.log('*** House Service - ***' , newHouse)
    await newHouse.save();
    return newHouse;
  }
  // Ajouter une nouvelle catégorie
  // async addInventoryCategory(houseId: string, categoryName: string, categoryDescription?: string): Promise<Category> {
  //   const newCategory = new this.categoryModel({ name: categoryName, description: categoryDescription });
  //   const category = await newCategory.save();
  //   await this.houseModel.findByIdAndUpdate(houseId, { $push: { categories: category } });
  //   return category;
  // }

  // Mettre à jour une catégorie
  // async updateInventoryCategory(houseId: string, categoryId: string, categoryName: string, categoryDescription?: string): Promise<Category> {
  //   return this.categoryModel.findByIdAndUpdate(categoryId, { name: categoryName, description: categoryDescription }, { new: true });
  // }

  // async deleteInventoryCategory(houseId: string, categoryId: string): Promise<any> {
  //   return this.categoryModel.findByIdAndDelete(categoryId);
  // }
}
