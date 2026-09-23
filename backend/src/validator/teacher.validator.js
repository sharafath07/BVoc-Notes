import { z } from "zod";

export const teacherRegistrationSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must not exceed 100 characters"),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email address")
            .transform((value) => value.toLowerCase()),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password must not exceed 100 characters"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );