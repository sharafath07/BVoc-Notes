import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

const publicProfile = { id: true, name: true, username: true, email: true, role: true, profileImageUrl: true };

export class ProfileUpdateError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export async function updateProfile(userId, input) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { ...publicProfile, passwordHash: true, status: true },
    });
    if (user?.status !== "ACTIVE" || !["STUDENT", "TEACHER"].includes(user.role)) {
        throw new ProfileUpdateError(403, "You do not have permission to edit this profile.");
    }

    const changes = {};
    if (input.username !== undefined && input.username !== user.username) changes.username = input.username;
    if (input.email !== undefined && input.email !== user.email) changes.email = input.email;
    if (input.profileImageUrl !== undefined) changes.profileImageUrl = input.profileImageUrl;

    const needsPassword = changes.username !== undefined || changes.email !== undefined || input.newPassword !== undefined;
    if (needsPassword) {
        if (!input.currentPassword || !(await bcrypt.compare(input.currentPassword, user.passwordHash))) {
            throw new ProfileUpdateError(400, "Enter your correct current password to change sign-in details.");
        }
        if (input.newPassword !== undefined) changes.passwordHash = await bcrypt.hash(input.newPassword, 12);
    }

    return prisma.user.update({
        where: {
            id: userId,
            status: "ACTIVE",
            role: user.role,
            ...(needsPassword && { passwordHash: user.passwordHash }),
        },
        data: changes,
        select: publicProfile,
    });
}
