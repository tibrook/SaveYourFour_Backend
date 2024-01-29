import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House } from './house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel('House') private readonly houseModel: Model<House>,
  ) {}

  async getAllInventoryCategories(houseId: string): Promise<string[]> {
    const house = await this.houseModel.findById(houseId).exec();
    console.log(houseId)
    console.log(house)

    if (!house) {
      throw new NotFoundException('Inventory House not found');
    }else{
      console.log('House found')
    }
    return house.inventoryCategory;
  }
  async createHouse(userId: string): Promise<House> {
    const defaultFrenchCategories = [
      'Fruits & Légumes', 'Viandes & Poissons', 'Produits Laitiers', 
      'Céréales & Féculents', 'Épices & Condiments', 'Produits Secs', 
      'Conserves & Bocaux', 'Boissons'
    ];
    const defaultEnglishCategories = [
      'Fruits & Légumes', 'Viandes & Poissons', 'Produits Laitiers', 
      'Céréales & Féculents', 'Épices & Condiments', 'Produits Secs', 
      'Conserves & Bocaux', 'Boissons'
    ];
    const newHouse = new this.houseModel({
      name: 'Default House',
      users: [userId],
      inventoryCategory: defaultFrenchCategories
    });
    console.log('*** House Service - ***' ,newHouse)
    await newHouse.save();
    return newHouse;
  }
  // Ajouter une nouvelle catégorie
  async addInventoryCategory(houseId: string, categoryName: string): Promise<House> {
    return this.houseModel.findByIdAndUpdate(
      houseId,
      { $push: { inventoryCategory: categoryName } },
      { new: true }
    ).exec();
  }

  // Mettre à jour une catégorie
  async updateInventoryCategory(houseId: string, oldCategoryName: string, newCategoryName: string): Promise<House> {
    const house = await this.houseModel.findById(houseId).exec();
    if (!house) {
      throw new Error('House not found');
    }
  
    const categoryIndex = house.inventoryCategory.indexOf(oldCategoryName);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
  
    house.inventoryCategory[categoryIndex] = newCategoryName;
    return house.save();
  }

  async deleteInventoryCategory(houseId: string, categoryName: string): Promise<House> {
    return this.houseModel.findByIdAndUpdate(
      houseId,
      { $pull: { inventoryCategory: categoryName } },
      { new: true }
    ).exec();
  }
}
