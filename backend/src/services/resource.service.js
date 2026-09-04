import prisma from "../lib/prisma.js";

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

export async function getResources({ subjectId, type }) {
    return prisma.resource.findMany({
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
                    semester: true,
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