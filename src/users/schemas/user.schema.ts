// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

// User type interface
export interface User {
  username: string;
  password: string;
  email:string;
}
