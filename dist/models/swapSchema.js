import mongoose, { Schema, model, Document, Types } from "mongoose";
;
const swapSchema = new Schema({
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
}, { timestamps: true });
export default model("Swap", swapSchema);
//# sourceMappingURL=swapSchema.js.map