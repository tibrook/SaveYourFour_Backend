// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  username: String
});

// User type interface
export interface User {
  email: string;
  password: string;
  firstName: String;
  lastName: String;
  username: String;
}
  