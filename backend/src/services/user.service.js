import prisma from "../lib/prisma.js";


// Get all users
export async function getAllUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            studentProfile: {
                select: {
                    registerNumber: true,
                    semester: true
                },
            },
        },
        orderBy: {
            studentProfile: {
                registerNumber: "asc"
            }
        },
    });
}


// Update user
export async function updateUser(id, data) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Check email is not already used by another user
    if (data.email && data.email !== user.email) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new Error("Email already exists");
        }
    }

    return await prisma.user.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            email: data.email,
            role: data.role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
}


// Delete user
export async function deleteUser(id) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return await prisma.user.delete({
        where: {
            id,
        },
    });
}