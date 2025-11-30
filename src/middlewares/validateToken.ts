import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request{
    user?:any;
};

export function isAuth(req:AuthRequest , res:Response, next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "You Are Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = decoded;
        next();
    }catch(err){
        console.error("Error Found", err);
        return res.status(401).json({message: "Invalid Token"});
    }
};