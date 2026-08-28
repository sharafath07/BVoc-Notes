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
    console.log("Seeding semesters and subjects...");

    const semesters = [];

    for (let number = 1; number <= 8; number++) {
        const semester = await prisma.semester.upsert({
            where: {
                number,
            },
            update: {},
            create: {
                number,
            },
        });

        semesters.push(semester);
    }
    const subjects = {
        1: [
            "Programming Fundamentals With C",
            "Web Programming",
            "Discrete Mathematics",
            "Descriptive Statistics for Data Analytics",
            "Office Automation",
            "English"
        ],

        2: [
            "Computational Thinking Using Python",
            "Data Structures",
            "Software Engineering",
            "Data Analysis Using Spreadsheet",
            "English",
            "Arabic",
            "Hindi",
            "Malayalam"
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
            "KKS-Hindi"
        ],
    };
    for (const [semesterNumber, subjectNames] of Object.entries(subjects)) {
        const semester = await prisma.semester.findUnique({
            where: {
                number: Number(semesterNumber),
            },
        });

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
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });