import mongoose, {Schema, model, Document, Types} from "mongoose";

export interface IReview extends Document {
    swapId: mongoose.Types.ObjectId,
    fromUserId: mongoose.Types.ObjectId,
    toUserId: mongoose.Types.ObjectId,
    rating: number,
    comment?: string
}

const reviewSchema = new Schema<IReview>(
  {
    swapId: {
      type: Schema.Types.ObjectId,
      ref: "Swap",
      required: true,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

export default model<IReview>("Review", reviewSchema);