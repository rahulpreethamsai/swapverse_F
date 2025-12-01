import mongoose, { Document, Types } from "mongoose";
export interface IReview extends Document {
    swapId: mongoose.Types.ObjectId;
    fromUserId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
}
declare const _default: mongoose.Model<IReview, {}, {}, {}, mongoose.Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=reviewSchema.d.ts.map