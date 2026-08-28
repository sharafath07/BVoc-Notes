import { z } from "zod";

export const createResourceSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(150),

    description: z
        .string()
        .trim()
        .max(500, "Description is too long")
        .optional(),

    subjectId: z.string().min(1, "Subject is required"),

    type: z.enum([
        "NOTES",
        "PYQ",
        "QUESTION_BANK",
        "LAB",
        "ASSIGNMENT",
        "STUDY_MATERIAL",
    ]),

    fileName: z.string().trim().min(1, "File name is required"),

    fileUrl: z.url("Invalid Google Drive URL"),
});

