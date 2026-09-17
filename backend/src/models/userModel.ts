import { Schema, Document, model } from "mongoose";

export interface Iuser extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  refreshToken: {
    type: String,
    // required?: true,
  }
}, { timestamps: true });

export default model<Iuser>("User", userSchema);
