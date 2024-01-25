import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House } from './house.entity';
import { Category } from './category.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel('House') private readonly houseModel: Model<House>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}

   async getAllInventoryCategories(houseId: string): Promise<Category[]> {
    const house = await this.houseModel.findById(houseId).populate('categories');
    return house.categories;
  }

  // Création des catégories par défaut lors de la création de la maison
  async createDefaultInventoryCategories(houseId: string): Promise<Category[]> {
    const defaultCategories = [
      'Fruits & Légumes', 'Viandes & Poissons', 'Produits Laitiers', 
      'Céréales & Féculents', 'Épices & Condiments', 'Produits Secs', 
      'Conserves & Bocaux', 'Boissons'
    ];

    const categories = await Promise.all(defaultCategories.map(async (name) => {
      const newCategory = new this.categoryModel({ name });
      return newCategory.save();
    }));

    await this.houseModel.findByIdAndUpdate(houseId, { $push: { categories: { $each: categories } } });
    return categories;
  }

  // Ajouter une nouvelle catégorie
  async addInventoryCategory(houseId: string, categoryName: string, categoryDescription?: string): Promise<Category> {
    const newCategory = new this.categoryModel({ name: categoryName, description: categoryDescription });
    const category = await newCategory.save();
    await this.houseModel.findByIdAndUpdate(houseId, { $push: { categories: category } });
    return category;
  }

  // Mettre à jour une catégorie
  async updateInventoryCategory(houseId: string, categoryId: string, categoryName: string, categoryDescription?: string): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(categoryId, { name: categoryName, description: categoryDescription }, { new: true });
  }

  async deleteInventoryCategory(houseId: string, categoryId: string): Promise<any> {
    return this.categoryModel.findByIdAndDelete(categoryId);
  }
}
