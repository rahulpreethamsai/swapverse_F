import mongoose, { Document, Types } from "mongoose";
export interface ISwap extends Document {
    fromUserId: mongoose.Types.ObjectId;
    toUserId: mongoose.Types.ObjectId;
    itemOfferedId?: mongoose.Types.ObjectId;
    itemRequestedId: mongoose.Types.ObjectId;
    status: "proposed" | "accepted" | "in_escrow" | "picked_up" | "returned" | "closed" | "disputed" | "cancelled";
    depositAmount: number;
    startDate: Date;
    endDate: Date;
    contract: {
        beforePhotos: string[];
        afterPhotos: string[];
        termTexts: string;
    };
    messages: {
        userId: mongoose.Types.ObjectId;
        text: string;
        timeStamp: Date;
    }[];
}
declare const _default: mongoose.Model<ISwap, {}, {}, {}, mongoose.Document<unknown, {}, ISwap, {}, {}> & ISwap & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=swapSchema.d.ts.map