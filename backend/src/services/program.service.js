import prisma from "../lib/prisma.js";

export async function getAllPrograms() {
    return await prisma.program.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            name: "asc",
        },
    });
}