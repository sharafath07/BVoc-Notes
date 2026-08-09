import { z } from "zod";

import { loginUser } from "../services/auth.service.js";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email"),

    password: z
        .string()
        .min(1, "Password is required"),
});

export async function login(req, res, next) {
    try {
        const data = loginSchema.parse(req.body);

        const result = await loginUser(
            data.email,
            data.password
        );

        res.cookie("accessToken", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
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