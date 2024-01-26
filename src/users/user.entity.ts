// src/users/user.entity.ts
import * as mongoose from 'mongoose';
import { House } from '../house/schemas/house.schema'; 
export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  preferredLanguage: String,
  houses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }]
});

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  preferredLanguage: string;
  lastName: string;
  email: string;
  password: string;
  houses: House[]; 
}