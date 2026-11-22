import { z } from "zod";

import { LoginError, loginUser } from "../services/auth.service.js";

const passwordSchema = z.string().min(1, "Password is required");
const loginSchema = z.union([
    z.object({
        identifier: z.string().trim().min(1).max(254),
        password: passwordSchema,
    }),
    z.object({
        email: z.string().trim().email(),
        password: passwordSchema,
    }),
]);

export async function login(req, res, next) {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, message: "Enter your sign-in details and password." });
        }
        const { data } = parsed;

        const result = await loginUser(
            data.identifier ?? data.email,
            data.password
        );

        res.cookie("accessToken", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        if (error instanceof LoginError) {
            return res.status(401).json({ success: false, message: error.message });
        }
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
        sameSite: "none",
    });

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}
