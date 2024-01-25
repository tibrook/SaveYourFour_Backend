
import * as mongoose from 'mongoose';
import { User } from '../users/user.entity'; 
import { Category } from './category.entity'; 

export const HouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] 
});

export interface House extends mongoose.Document {
    id: string;
    name: string;
    users: User[]; 
    categories: Category[];
}