import mongoose, { Document, Types } from "mongoose";
export interface IDispute extends Document {
    swapId: mongoose.Types.ObjectId;
    raisedBy: mongoose.Types.ObjectId;
    evidence: string[];
    status: "open" | "escalated" | "resolved";
    resolution: string;
    adminId: mongoose.Types.ObjectId;
    resolvedAt: Date;
}
declare const _default: mongoose.Model<IDispute, {}, {}, {}, mongoose.Document<unknown, {}, IDispute, {}, {}> & IDispute & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=disputeSchema.d.ts.map