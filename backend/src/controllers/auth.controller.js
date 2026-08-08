import { z } from "zod";

import { loginUser } from "../services/auth.service.js";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function login(req, res, next) {
    try {
        const validatedData = loginSchema.parse(req.body);

        const { email, password } = validatedData;

        const result = await loginUser(email, password);

        res.cookie("accessToken", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
        });
    } catch (error) {
        next(error);
    }
}

export async function getMe(req, res) {
    res.status(200).json({
        success: true,
        user: req.user,
    });
}

export async function logout(req, res) {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}