// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';
import { House } from '../../house/schemas/house.schema'; // Assurez-vous que le chemin d'accès est correct

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  houses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }]
});

// User type interface
export interface User extends mongoose.Document {
  email: string;
  password: string;
  firstName: String;
  lastName: String;
  houses: House[];
}
  