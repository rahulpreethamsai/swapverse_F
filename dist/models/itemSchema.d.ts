import { Document, Types } from "mongoose";
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
declare const _default: import("mongoose").Model<IItem, {}, {}, {}, Document<unknown, {}, IItem, {}, {}> & IItem & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=itemSchema.d.ts.map