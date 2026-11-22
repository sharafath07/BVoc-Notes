import { z } from "zod";

export const usernameSchema = z.string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]{3,24}$/, "Use 3–24 letters, numbers, or underscores for your username.");

const imageUrlSchema = z.string().trim().max(2048).refine((value) => {
    try {
        const url = new URL(value);
        if (url.protocol !== "https:" || url.username || url.password) return false;
        if (url.hostname !== "drive.google.com") return true;
        const fileId = url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/)?.[1] || url.searchParams.get("id");
        return /^[\w-]+$/.test(fileId ?? "");
    } catch {
        return false;
    }
}, "Enter an HTTPS image URL or a Google Drive file link.");

export const profileUpdateSchema = z.strictObject({
    username: usernameSchema.optional(),
    email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254).optional(),
    profileImageUrl: imageUrlSchema.nullable().optional(),
    currentPassword: z.string().min(1).max(128).optional(),
    newPassword: z.string().min(8, "Use at least 8 characters for the new password.")
        .refine((value) => Buffer.byteLength(value, "utf8") <= 72, "The new password must be at most 72 bytes.")
        .optional(),
});
