import bcrypt from "bcrypt";

import prisma from "../lib/prisma.js";

const SALT_ROUNDS = 12;

/**
 * Register a new teacher
 */
export async function registerTeacher({
    name,
    email,
    password,
}) {
    const normalizedName = name.trim();

    const normalizedEmail = email
        .trim()
        .toLowerCase();

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

    // Hash password
    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    // Create user and teacher profile
    const user = await prisma.$transaction(
        async (tx) => {
            const createdUser = await tx.user.create({
                data: {
                    name: normalizedName,
                    email: normalizedEmail,
                    passwordHash,
                    role: "TEACHER",
                },
            });

            await tx.teacherProfile.create({
                data: {
                    userId: createdUser.id,
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
        status: user.status,
        createdAt: user.createdAt,
    };
}


/**
 * Get all teachers
 */
export async function getTeachers() {
    const teachers = await prisma.user.findMany({
        where: {
            role: "TEACHER",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return teachers;
}


/**
 * Delete a teacher
 */
export async function deleteTeacher(userId) {
    const teacher = await prisma.user.findFirst({
        where: {
            id: userId,
            role: "TEACHER",
        },
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    const resourceCount = await prisma.resource.count({
        where: {
            uploadedById: userId,
        },
    });

    if (resourceCount > 0) {
        throw new Error(
            "This teacher cannot be deleted because they have uploaded resources"
        );
    }

    await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return {
        id: userId,
        message: "Teacher deleted successfully",
    };
}