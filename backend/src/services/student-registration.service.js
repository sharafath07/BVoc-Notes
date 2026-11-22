import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";
import { env } from "../config/env.js";

const SALT_ROUNDS = 12;

export class RegistrationConflictError extends Error {}

export async function registerStudent({
    name,
    email,
    username,
    password,
    registerNumber,
    semester,
    batch,
    status,
}) {
    const normalizedName = name.trim();

    const normalizedEmail = email
        .trim()
        .toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const normalizedRegisterNumber = registerNumber
        .trim()
        .toUpperCase();

    const normalizedBatch = String(batch).trim();

    const normalizedSemester = status === "ALUMNI" ? null : Number(semester);

    // Validate semester
    if (
        status !== "ALUMNI" &&
        (!Number.isInteger(normalizedSemester) ||
            normalizedSemester < 1 ||
            normalizedSemester > 8)
    ) {
        throw new Error("Invalid semester");
    }

    // Validate batch
    if (!/^\d{4}$/.test(normalizedBatch)) {
        throw new Error("Invalid batch");
    }

    // Validate register number
    if (!/^[A-Z]{7}\d{3}$/.test(normalizedRegisterNumber)) {
        throw new Error(
            "Register Number should like FKAZBVW021"
        );
    }

    const [existingUsername, existingEmail, existingStudentProfile] = await Promise.all([
        prisma.user.findUnique({ where: { username: normalizedUsername }, select: { id: true } }),
        prisma.user.findUnique({ where: { email: normalizedEmail }, select: { id: true } }),
        prisma.studentProfile.findUnique({ where: { registerNumber: normalizedRegisterNumber }, select: { id: true } }),
    ]);
    if (existingUsername) throw new RegistrationConflictError("That username is already taken.");
    if (existingEmail) throw new RegistrationConflictError("An account with this email already exists.");
    if (existingStudentProfile) {
        throw new RegistrationConflictError("This registration number is already registered.");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    // Create user and student profile
    const user = await prisma.$transaction(
        async (tx) => {
            const createdUser = await tx.user.create({
                data: {
                    name: normalizedName,
                    email: normalizedEmail,
                    username: normalizedUsername,
                    passwordHash,
                    role: "STUDENT",
                },
            });

            await tx.studentProfile.create({
                data: {
                    userId: createdUser.id,
                    registerNumber:
                        normalizedRegisterNumber,
                    batch: normalizedBatch,
                    semester: normalizedSemester,
                    status,
                },
            });

            return createdUser;
        }
    );

    // Create JWT token
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
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            registerNumber: normalizedRegisterNumber,
        },
    };
}
