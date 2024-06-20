import { Schema, model, Model, ObjectId } from "mongoose";

interface IUser {
  name: string;
  age: number;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
