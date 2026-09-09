import prisma from "../lib/prisma.js";

export async function getAllSemesters(programId) {
    return await prisma.semester.findMany({
        where: programId
            ? {
                programId,
            }
            : undefined,

        select: {
            id: true,
            number: true,
            programId: true,
            program: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            number: "asc",
        },
    });
}


// export async function createSemester(number, programId) {
//     const program = await prisma.program.findUnique({
//         where: {
//             id: programId,
//         },
//     });

//     if (!program) {
//         throw new Error("Program not found");
//     }

//     const existingSemester = await prisma.semester.findUnique({
//         where: {
//             number_programId: {
//                 number,
//                 programId,
//             },
//         },
//     });

//     if (existingSemester) {
//         throw new Error(
//             "Semester already exists for this program"
//         );
//     }

//     return await prisma.semester.create({
//         data: {
//             number,
//             programId,
//         },
//         select: {
//             id: true,
//             number: true,
//             programId: true,
//             program: {
//                 select: {
//                     id: true,
//                     name: true,
//                 },
//             },
//         },
//     });
// }