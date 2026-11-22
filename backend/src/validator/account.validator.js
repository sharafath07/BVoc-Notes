import { z } from "zod";

export const usernameSchema = z.string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]{3,24}$/, "Use 3–24 letters, numbers, or underscores for your username.");
