import mongoose, { Schema, model, Document, Types } from "mongoose";
const reviewSchema = new Schema({
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
}, { timestamps: true });
export default model("Review", reviewSchema);
//# sourceMappingURL=reviewSchema.js.map