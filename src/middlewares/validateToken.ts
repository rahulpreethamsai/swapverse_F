import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'

export interface AuthRequest extends Request {
    user?: any;
};

export async function isAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You Are Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };
        const user = await User.findById(decoded.id).select("_id name email");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Error Found", err);
        return res.status(401).json({ message: "Invalid Token" });
    }
};