import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(32),
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    FRONTEND_URL: z.string().min(1)
});

export const env = envSchema.parse(process.env);