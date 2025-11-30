import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    name:string;
    email:string;
    phone?:string;
    role: "admin" | "user";
    passwordHash: string;
    location?: { city: string; lat?: number; lng?: number };
    kycStatus: "pending"|"verified"|"rejected";
    trust: { score: number; totalRaters: number; incidents: number };
    badges: string[];
};

const userSchema = new Schema<IUser>({
    name : {type:String, required:true},
    email: {type:String, required:true, unique:true},
    phone: String,
    role:{type:String, enum:["admin", "user"], default:"user"},
    passwordHash: {type:String, required:true},
    location: {city:String, lat:Number, lng:Number},
    kycStatus: {type:String, default: "pending"},
    trust: { score: {type:Number, default:50}, totalRaters: {type:Number, default:0}, incidents: {type:Number, default:0}},
    badges:[String]     
}
,
{timestamps:true});

export default model<IUser>("User", userSchema);
