import mongoose, { Schema, model, Document, Types } from "mongoose";
;
const disputeSchema = new Schema({
    swapId: { type: Schema.Types.ObjectId, ref: "Swap", required: true },
    raisedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    evidence: [{ type: String }],
    status: { type: String, enum: ["open", "escalated", "resolved"], default: "open" },
    resolution: { type: String },
    adminId: { type: Schema.Types.ObjectId, ref: "User" },
    resolvedAt: { type: Date },
}, { timestamps: true });
export default model("Dispute", disputeSchema);
//# sourceMappingURL=disputeSchema.js.map