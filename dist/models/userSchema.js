import { model, Schema, Document } from "mongoose";
;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    passwordHash: { type: String, required: true },
    location: { city: String, lat: Number, lng: Number },
    kycStatus: { type: String, default: "pending" },
    trust: { score: { type: Number, default: 50 }, totalRaters: { type: Number, default: 0 }, incidents: { type: Number, default: 0 } },
    badges: [String]
}, { timestamps: true });
export default model("User", userSchema);
//# sourceMappingURL=userSchema.js.map