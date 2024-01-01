// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// User type interface
export interface User {
  email: string;
  password: string;
}
  