import { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    role: "admin" | "user";
    passwordHash: string;
    location?: {
        city: string;
        lat?: number;
        lng?: number;
    };
    kycStatus: "pending" | "verified" | "rejected";
    trust: {
        score: number;
        totalRaters: number;
        incidents: number;
    };
    badges: string[];
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=userSchema.d.ts.map