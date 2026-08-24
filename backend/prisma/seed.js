import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { register } from "node:module";
import { object } from "zod";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const names = ["Adhil K", "Amjed Sadiq AK", "Fathima Naja M", "Fathima Rasha", "Hanan Hafees Mohammed",
    "Hassan Misbaah CA", "Mohammed Hazan K", "Muhammed Afnan P", "Muhammed Isham", "Muhammed Shahaniyas",
    "Murshid MM", "Najad Musab VK", "Nasih Ameen A", "Rifa Shirin K", "Shadhin TP",
    "Fathima Risha V", "Marva Ashraf K", "Mohammad Anas P", "Muhammed Nihal P", "Shan Basharsha Chalakkal",
    "Sharafath Ahammed V", "Afnan U", "Anagha P", "Anshitha TK", "Ayisha Hanoona",
    "Fathima Naja K", "Fida Fathima E", "Hathim P", "Ibrahim Raza", "Marzook KK",
    "Mirza Mariyam PT", "Muhammed Bezzam", "Muhammed Salman PK", "Muhammed Shamlal", "Muhammed Zayan",
    "Shanil M"
]

const students = [];

for (let i = 1; i <= names.length; i++) {
    let element

    if (i === 19 || i === 34) {
        continue
    } else {
        if (i < 10) {
            element = {
                name: names[i - 1],
                batch: "2025",
                registerNumber: `FKAZBVW00${i}`
            }
        } else {
            element = {
                name: names[i - 1],
                batch: "2025",
                registerNumber: `FKAZBVW0${i}`
            }
        }
    }

    students.push(element)

}

console.log(students);
console.log("Total students:", students.length);

async function main() {
    for (const student of students) {
        await prisma.studentRegistry.upsert({
            where: {
                registerNumber: student.registerNumber,
            },
            update: {
                name: student.name,
                batch: student.batch,
                isActive: true,
            },
            create: {
                registerNumber: student.registerNumber,
                name: student.name,
                batch: student.batch,
                isActive: true,
            },
        });
    }

    console.log(
        `${students.length} students added to registry`
    );
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });