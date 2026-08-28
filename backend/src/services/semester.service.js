import prisma from "../lib/prisma.js";

export async function getAllSemesters() {
    return await prisma.semester.findMany({
        orderBy: {
            number: "asc",
        },
    });
}