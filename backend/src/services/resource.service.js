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
        where: {
            ...(subjectId && { subjectId }),
            ...(type && { type }),
        },
        include: {
            subject: {
                include: {
                    semester: true,
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

    return prisma.resource.update({
        where: {
            id,
        },
        data,
    });
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