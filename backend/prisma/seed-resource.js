import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("Seeding programs, semesters and subjects...");

    // --------------------------------------------------
    // Programs
    // --------------------------------------------------

    const fyug = await prisma.program.upsert({
        where: {
            name: "FYUG",
        },
        update: {},
        create: {
            name: "FYUG",
        },
    });

    const ug = await prisma.program.upsert({
        where: {
            name: "UG",
        },
        update: {},
        create: {
            name: "UG",
        },
    });

    // --------------------------------------------------
    // FYUG Subjects
    // --------------------------------------------------

    const fyugSubjects = {
        1: [
            "Programming Fundamentals With C",
            "Web Programming",
            "Discrete Mathematics",
            "Descriptive Statistics for Data Analytics",
            "Office Automation",
            "English",
        ],

        2: [
            "Computational Thinking Using Python",
            "Data Structures",
            "Software Engineering",
            "Data Analysis Using Spreadsheet",
            "English",
            "Arabic",
            "Hindi",
            "Malayalam",
        ],

        3: [
            "Object Oriented Programming Concept Using JAVA",
            "Database Management System",
            "Operating System",
            "Visualisation Using Power BI",
            "Analytics Using SPSS",
            "Cyber Law",
            "KKS-Arabic",
            "KKS-Malayalam",
            "KKS-Hindi",
        ],
    };

    // --------------------------------------------------
    // Create FYUG Semesters + Subjects
    // --------------------------------------------------

    for (let number = 1; number <= 8; number++) {
        const semester = await prisma.semester.upsert({
            where: {
                number_programId: {
                    number,
                    programId: fyug.id,
                },
            },
            update: {},
            create: {
                number,
                programId: fyug.id,
            },
        });

        const subjectNames = fyugSubjects[number] ?? [];

        for (const name of subjectNames) {
            await prisma.subject.upsert({
                where: {
                    name_semesterId: {
                        name,
                        semesterId: semester.id,
                    },
                },
                update: {},
                create: {
                    name,
                    semesterId: semester.id,
                },
            });
        }
    }

    // --------------------------------------------------
    // UG Semesters
    // --------------------------------------------------

    for (let number = 1; number <= 6; number++) {
        await prisma.semester.upsert({
            where: {
                number_programId: {
                    number,
                    programId: ug.id,
                },
            },
            update: {},
            create: {
                number,
                programId: ug.id,
            },
        });
    }

    console.log("Seeding completed successfully.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });