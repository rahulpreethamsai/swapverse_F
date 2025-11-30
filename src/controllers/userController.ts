import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from "../models/userSchema.js";


const zodRegisterValidation = z.object({
    name: z.string().min(3),
    email: z.email(),
    phone: z.string().min(10).max(10).optional(),
    role: z.enum(["admin", "user"]).optional(),
    passwordHash: z.string().min(6).max(12),
    location: z.string().optional(),
    kycStatus: z.string().default("pending"),
    adminKey: z.string().optional()
});

const zodLoginValidation = z.object({
    email: z.email(),
    passwordHash: z.string().min(6).max(12),
});

export async function registerController(req: Request, res: Response) {
    try {
        const parsedData = zodRegisterValidation.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                message: parsedData.error.flatten().fieldErrors,
                success: false
            });
        }

        const { name, email, phone, role, passwordHash, location, adminKey } = parsedData.data;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered!", success: false });
        }

        let finalRole = "user";
        if (role === "admin") {
            if (adminKey !== process.env.ADMIN_KEY) {
                return res.status(400).json({ message: "Invalid Admin Key", success: false });
            }
            finalRole = "admin";
        }

        const hashedPassword = await bcrypt.hash(passwordHash, 10);

        const newUser = await User.create({
            name,
            email,
            phone,
            role: finalRole,
            passwordHash: hashedPassword,
            location
        });

        return res.status(201).json({
            message: "Registration successful",
            user: newUser,
            success: true
        });

    } catch (err) {
        console.error("Register Error", err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export async function loginController(req: Request, res: Response) {
    try {
        const parsedData = zodLoginValidation.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                message: parsedData.error.flatten().fieldErrors,
                success: false
            });
        }

        const { email, passwordHash } = parsedData.data;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        const passwordMatch = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect password", success: false });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY as string,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            success: true
        });

    } catch (err) {
        console.error("Login Error", err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


export async function profileController(req: Request, res: Response) {
    try {
        const userId = (req as any).user.id;

        const userProfile = await User.findById(userId).select("-passwordHash");
        if (!userProfile) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ user: userProfile, success: true });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};