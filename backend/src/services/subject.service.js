import prisma from "../lib/prisma.js";

// Get all subjects
export async function getAllSubjects() {
    return await prisma.subject.findMany({
        select: {
            id: true,
            name: true,
            semesterId: true,
            semester: {
                select: {
                    id: true,
                    number: true,
                    program: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
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

    const updateData = {};

    if (data.name !== undefined) {
        const name = data.name.trim();

        if (!name) {
            throw new Error("Subject name cannot be empty");
        }

        updateData.name = name;
    }

    if (data.semesterId !== undefined) {
        updateData.semesterId = data.semesterId;
    }

    try {
        return await prisma.subject.update({
            where: {
                id,
            },
            data: updateData,
            select: {
                id: true,
                name: true,
                semesterId: true,
                semester: {
                    select: {
                        id: true,
                        number: true,
                        program: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        if (error.code === "P2002") {
            throw new Error(
                "Subject already exists for this semester"
            );
        }

        throw error;
    }
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

export async function createSubject(name, semesterId) {
    const semester = await prisma.semester.findUnique({
        where: {
            id: semesterId,
        },
    });

    if (!semester) {
        throw new Error("Semester not found");
    }

    const existingSubject = await prisma.subject.findUnique({
        where: {
            name_semesterId: {
                name,
                semesterId,
            },
        },
    });

    if (existingSubject) {
        throw new Error(
            "Subject already exists for this semester"
        );
    }

    return await prisma.subject.create({
        data: {
            name,
            semesterId,
        },
        select: {
            id: true,
            name: true,
            semesterId: true,
            semester: {
                select: {
                    id: true,
                    number: true,
                    program: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
}