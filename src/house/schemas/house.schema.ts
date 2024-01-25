import * as mongoose from 'mongoose';
import { User } from '../../users/user.entity';

export const HouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  inventoryCategory: [{ type: String }] // Modifié pour être un tableau de chaînes de caractères
});

export interface House extends mongoose.Document {
  id: string;
  name: string;
  users: mongoose.Types.ObjectId[];
  inventoryCategory: string[]; // Type mis à jour pour correspondre au schéma
}
