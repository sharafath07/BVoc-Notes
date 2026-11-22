import prisma from "../lib/prisma.js";

export function getResourceAvailability() {
    return prisma.$queryRaw`
        SELECT program.id AS "programId", program.name AS "programName",
               semester.id AS "semesterId", semester.number AS "semesterNumber",
               subject.id AS "subjectId", subject.name AS "subjectName",
               array_agg(DISTINCT resource.type::text) AS types
        FROM "Resource" AS resource
        JOIN "Subject" AS subject ON subject.id = resource."subjectId"
        JOIN "Semester" AS semester ON semester.id = subject."semesterId"
        JOIN "Program" AS program ON program.id = semester."programId"
        GROUP BY program.id, semester.id, subject.id
        ORDER BY program.name, semester.number, subject.name
    `;
}

export async function createResource(data, userId) {
    const subject = await prisma.subject.findUnique({
        where: {
            id: data.subjectId,
        },
    });

    if (!subject) {
        throw new Error("Subject not found");
    }

    return prisma.resource.create({
        data: {
            title: data.title,
            description: data.description,
            subjectId: data.subjectId,
            type: data.type,
            fileName: data.fileName,
            fileUrl: data.fileUrl,
            uploadedById: userId,
        },
    });
}
export async function getResources({ subjectId, type, cardsOnly = false }) {
    if (cardsOnly) {
        return prisma.resource.findMany({
            where: { subjectId, type },
            select: { id: true, title: true, description: true, type: true, fileUrl: true },
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        });
    }

    return prisma.resource.findMany({
        where: {
            ...(subjectId && {
                subjectId,
            }),

            ...(type && {
                type,
            }),
        },

        include: {
            subject: {
                include: {
                    semester: {
                        include: {
                            program: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },

            uploadedBy: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getResourceById(id) {
    return prisma.resource.findUnique({
        where: {
            id,
        },
        include: {
            subject: {
                include: {
                    semester: {
                        include: {
                            program: true,
                        },
                    },
                },
            },
        },
    });
}

export async function updateResource(id, data) {
    const resource = await prisma.resource.findUnique({
        where: {
            id,
        },
    });

    if (!resource) {
        throw new Error("Resource not found");
    }

    // Check subject if subjectId is being changed
    if (data.subjectId) {
        const subject = await prisma.subject.findUnique({
            where: {
                id: data.subjectId,
            },
        });

        if (!subject) {
            throw new Error("Subject not found");
        }
    }

    const updatedResource = await prisma.resource.update({
        where: {
            id,
        },
        data: {
            title: data.title,
            description: data.description,
            subjectId: data.subjectId,
            type: data.type,
            fileName: data.fileName,
            fileUrl: data.fileUrl,
        },
        include: {
            subject: {
                include: {
                    semester: true,
                },
            },
            uploadedBy: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return updatedResource;
}

export async function deleteResource(id) {
    const resource = await prisma.resource.findUnique({
        where: {
            id,
        },
    });

    if (!resource) {
        throw new Error("Resource not found");
    }

    return prisma.resource.delete({
        where: {
            id,
        },
    });
}
