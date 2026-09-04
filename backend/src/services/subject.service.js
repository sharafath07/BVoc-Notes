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

// Update subject
export async function updateSubject(id, data) {
    const subject = await prisma.subject.findUnique({
        where: {
            id,
        },
    });

    if (!subject) {
        throw new Error("Subject not found");
    }

    // Check semester exists if semesterId is being changed
    if (data.semesterId) {
        const semester = await prisma.semester.findUnique({
            where: {
                id: data.semesterId,
            },
        });

        if (!semester) {
            throw new Error("Semester not found");
        }
    }

    return await prisma.subject.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            semesterId: data.semesterId,
        },
        select: {
            id: true,
            name: true,
            semesterId: true,
        },
    });
}

// Delete subject
export async function deleteSubject(id) {
    const subject = await prisma.subject.findUnique({
        where: {
            id,
        },
    });

    if (!subject) {
        throw new Error("Subject not found");
    }

    return await prisma.subject.delete({
        where: {
            id,
        },
    });
}