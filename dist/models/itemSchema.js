import { Schema, model, Document, Types } from "mongoose";
const itemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    estimatedValue: { type: Number, required: true },
    condition: { type: String, enum: ["new", "used", "refurbished"], default: "used" },
    images: [String],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["available", "swapped", "underReview"], default: "available" }
}, { timestamps: true });
export default model("Item", itemSchema);
//# sourceMappingURL=itemSchema.js.map