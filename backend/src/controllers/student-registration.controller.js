import { z } from "zod";

import {
    registerStudent,
} from "../services/student-registration.service.js";

const studentRegistrationSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2)
            .max(100),

        email: z
            .string()
            .trim()
            .email("Please provide a valid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(128),

        registerNumber: z
            .string()
            .trim()
            .toUpperCase()
            .regex(
                /^[A-Z]{7}\d{3}$/,
                "Register Number should like FKAZBVW021"
            ),

        semester: z
            .union([
                z.coerce
                    .number()
                    .int()
                    .min(1)
                    .max(8),
                z.null(),
            ]),

        status: z.enum(["ACTIVE", "ALUMNI"]),

        batch: z
            .string()
            .trim()
            .regex(/^\d{4}$/, "Invalid batch"),
    })
    .refine(
        (data) => {
            if (data.status === "ALUMNI") {
                return data.semester === null;
            }

            return (
                data.status === "ACTIVE" &&
                data.semester !== null
            );
        },
        {
            message:
                "Active students must have a semester, while alumni must not have a semester",
            path: ["semester"],
        }
    );

export async function registerStudentController(
    req,
    res,
    next
) {
    try {
        const data =
            studentRegistrationSchema.parse(req.body);

        const result =
            await registerStudent(data);

        // Set authentication cookie
        res.cookie("accessToken", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Student registration successful",
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        next(error);
    }
}