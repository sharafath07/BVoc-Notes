import { z } from "zod";

import {
    registerStudent,
} from "../services/student-registration.service.js";

const studentRegistrationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(100),

    email: z
        .string()
        .trim()
        .email(),

    password: z
        .string()
        .min(8)
        .max(128),

    registerNumber: z
        .string()
        .trim()
        .min(1)
        .max(50),
});

export async function registerStudentController(
    req,
    res,
    next
) {
    try {
        const data =
            studentRegistrationSchema.parse(req.body);

        const student =
            await registerStudent(data);

        return res.status(201).json({
            success: true,
            message: "Student registration successful",
            user: student,
        });
    } catch (error) {
        next(error);
    }
}