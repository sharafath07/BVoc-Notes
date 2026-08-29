import prisma from "../lib/prisma.js";


// Get all subjects
export async function getAllSubjects() {
    return await prisma.subject.findMany({
        select: {
            id: true,
            name: true,
            semesterId: true,
        },
        orderBy: {
            name: "asc",
        },
    });
}

// Get subjects by semester
export async function getSubjectsBySemester(semesterId) {
    return await prisma.subject.findMany({
        where: {
            semesterId,
        },
        select: {
            id: true,
            name: true,
            semesterId: true,
        },
        orderBy: {
            name: "asc",
        },
    });
}