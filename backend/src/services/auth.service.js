import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";
import { env } from "../config/env.js";

export class LoginError extends Error {}

export async function loginUser(identifier, password) {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const byEmail = normalizedIdentifier.includes("@");

    const user = await prisma.user.findUnique({
        where: byEmail ? { email: normalizedIdentifier } : { username: normalizedIdentifier, role: "STUDENT" },
    });

    if (!user) {
        throw new LoginError("Invalid username, email or password.");
    }

    if (user.status !== "ACTIVE") {
        throw new LoginError("Your account is not active");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new LoginError("Invalid username, email or password.");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return {
        token,

        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
        },
    };
}
