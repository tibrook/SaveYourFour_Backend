import * as mongoose from 'mongoose';

export const HouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

export interface House extends mongoose.Document {
    id: string;
    name: string;
    users: mongoose.Types.ObjectId[]; 
}
