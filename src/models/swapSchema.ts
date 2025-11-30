import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface ISwap extends Document {
    fromUserId: mongoose.Types.ObjectId,
    toUserId: mongoose.Types.ObjectId,
    itemOfferedId?: mongoose.Types.ObjectId,
    itemRequestedId: mongoose.Types.ObjectId,
    status: "proposed" | "accepted" | "in_escrow" | "picked_up" | "returned" | "closed" | "disputed" | "cancelled"
    depositAmount: number,
    startDate: Date,
    endDate: Date,
    contract: { beforePhotos: string[], afterPhotos: string[], termTexts: string },
    messages: { userId: mongoose.Types.ObjectId, text: string, timeStamp: Date }[],
};

const swapSchema = new Schema<ISwap>(
    {
        fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        itemOfferedId: { type: Schema.Types.ObjectId, ref: "Item", default: null },
        itemRequestedId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        status: { type: String, enum: ["proposed", "accepted", "in_escrow", "picked_up", "returned", "closed", "disputed", "cancelled"], default: "proposed" },
        depositAmount: { type: Number, default: 0 },
        startDate: Date,
        endDate: Date,
        contract: { beforePhotos: [String], afterPhotos: [String], termTexts: String },
        messages: [{ userId: { type: Schema.Types.ObjectId, ref: "User" }, text: String, timeStamp: { type: Date, default: Date.now } }]
    },
    { timestamps: true }
);

export default model<ISwap>("Swap", swapSchema);