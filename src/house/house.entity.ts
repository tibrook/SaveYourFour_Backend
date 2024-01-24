
import * as mongoose from 'mongoose';
import { User } from '../users/user.entity'; 

export const HouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Référence à l'entité User
});

export interface House extends mongoose.Document {
    id: string;
    name: string;
    users: User[]; 
}