import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

const SALT_ROUNDS = 12;

export async function registerStudent({
    name,
    email,
    password,
    registerNumber,
}) {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRegisterNumber = registerNumber
        .trim()
        .toUpperCase();

    const registeredStudent =
        await prisma.studentRegistry.findUnique({
            where: {
                registerNumber: normalizedRegisterNumber,
            },
        });

    if (!registeredStudent) {
        throw new Error("Invalid student registration number");
    }

    if (!registeredStudent.isActive) {
        throw new Error(
            "Student registration is currently disabled"
        );
    }

    if (registeredStudent.claimedAt) {
        throw new Error(
            "This registration number has already been registered"
        );
    }

    const registryName = registeredStudent.name
        .trim()
        .toLowerCase();

    if (registryName !== normalizedName.toLowerCase()) {
        throw new Error(
            "Name does not match the student registry"
        );
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (existingUser) {
        throw new Error(
            "An account with this email already exists"
        );
    }

    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    const user = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
            data: {
                name: normalizedName,
                email: normalizedEmail,
                passwordHash,
                role: "STUDENT",
            },
        });

        await tx.studentProfile.create({
            data: {
                userId: createdUser.id,
                registerNumber: normalizedRegisterNumber,
                batch: registeredStudent.batch,
            },
        });

        await tx.studentRegistry.update({
            where: {
                id: registeredStudent.id,
            },
            data: {
                claimedAt: new Date(),
            },
        });

        return createdUser;
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}