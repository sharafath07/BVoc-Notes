import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

const SALT_ROUNDS = 12;

export async function registerStudent({
    name,
    email,
    password,
    registerNumber,
    semester,
    batch,
}) {
    const normalizedName = name.trim();

    const normalizedEmail = email
        .trim()
        .toLowerCase();

    const normalizedRegisterNumber = registerNumber
        .trim()
        .toUpperCase();

    const normalizedBatch = String(batch).trim();

    const normalizedSemester = Number(semester);

    // Validate semester
    if (
        !Number.isInteger(normalizedSemester) ||
        normalizedSemester < 1 ||
        normalizedSemester > 8
    ) {
        throw new Error("Invalid semester");
    }

    // Validate batch
    if (!/^\d{4}$/.test(normalizedBatch)) {
        throw new Error("Invalid batch");
    }

    // Validate registration number
    if (!/^[A-Z]{7}\d{3}$/.test(normalizedRegisterNumber)) {
        throw new Error(
            "Invalid registration number. Format must be 7 letters followed by 3 numbers"
        );
    }

    // Check email uniqueness
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

    // Check registration number uniqueness
    const existingStudentProfile =
        await prisma.studentProfile.findUnique({
            where: {
                registerNumber: normalizedRegisterNumber,
            },
        });

    if (existingStudentProfile) {
        throw new Error(
            "This registration number is already registered"
        );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    // Create User + StudentProfile
    const user = await prisma.$transaction(
        async (tx) => {
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
                    registerNumber:
                        normalizedRegisterNumber,
                    batch: normalizedBatch,
                    semester: normalizedSemester,
                },
            });

            return createdUser;
        }
    );

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        registerNumber: normalizedRegisterNumber,
    };
}