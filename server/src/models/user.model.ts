import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  signupTimestamp: string;
}

const userSchema = new Schema({
  username: String,
  password: String,
  signupTimestamp: String,
});

export default mongoose.model<IUser>("User", userSchema);
