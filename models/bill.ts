import { Schema, Model, model, ObjectId } from "mongoose";

interface IBill {
  name: string;
  price: number;
  category: string;
  user: ObjectId;
}

const billSchema = new Schema<IBill>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Bill: Model<IBill> = model<IBill>("Bill", billSchema);

export default Bill;
