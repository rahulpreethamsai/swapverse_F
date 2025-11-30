import mongoose, {Schema, model, Document, Types} from "mongoose";

export interface IDispute extends Document{
    swapId: mongoose.Types.ObjectId,
    raisedBy: mongoose.Types.ObjectId,
    evidence: string[],
    status: "open" | "escalated" | "resolved",
    resolution: string,
    adminId: mongoose.Types.ObjectId,
    resolvedAt: Date
};

const disputeSchema = new Schema<IDispute>(
  {
    swapId: { type: Schema.Types.ObjectId, ref: "Swap", required: true },
    raisedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    evidence: [{ type: String }],
    status: { type: String, enum: ["open", "escalated", "resolved"], default: "open" },
    resolution: { type: String },
    adminId: { type: Schema.Types.ObjectId, ref: "User" },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export default model<IDispute>("Dispute", disputeSchema);
