import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from './schemas/user.schema';
import { House } from '../house/schemas/house.schema'; // Assurez-vous que le chemin d'accès est correct
import { CreateUserDto } from './dto/create-user.dto'; // Importez CreateUserDto
import { HouseService } from '../house/house.service';

// Create user document type
type UserDocument = User & Document;
type HouseDocument = House & Document;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('House') private houseModel: Model<HouseDocument> ,
    private houseService: HouseService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Manage new user
    const newUser = new this.userModel({
      ...createUserDto,
      type: 'user', 
      verified: false 
    });
    const defaultHouse = await this.houseService.createHouse(newUser._id);
    console.log(defaultHouse)

    // Associate new user to default house
    newUser.houses = [defaultHouse._id];
    await newUser.save();

    return newUser;
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
}
