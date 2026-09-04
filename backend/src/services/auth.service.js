import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";
import { env } from "../config/env.js";

export async function loginUser(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
        include: {
            studentProfile: true,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (user.status !== "ACTIVE") {
        throw new Error("Your account is not active");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
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
            role: user.role,
        },
    };
}