import { Schema, model, Document, Types } from "mongoose";

export interface IItem extends Document {
    name: string;
    description?: string;
    category: string;
    estimatedValue: number;
    condition: "new" | "used" | "refurbished";
    images?: string[];
    owner: Types.ObjectId;
    status: "available" | "swapped" | "underReview";
}

const itemSchema = new Schema<IItem>(
    {
        name: { type: String, required: true },
        description: String,
        category: { type: String, required: true },
        estimatedValue: { type: Number, required: true },
        condition: { type: String, enum: ["new", "used", "refurbished"], default: "used" },
        images: [String],
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["available", "swapped", "underReview"], default: "available" }
    },
    { timestamps: true }
);

export default model<IItem>("Item", itemSchema);
