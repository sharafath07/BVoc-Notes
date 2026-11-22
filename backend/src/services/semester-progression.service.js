import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";

const indiaCalendar = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
});
const maxTimerDelay = 12 * 60 * 60 * 1000;
const retryDelay = 60 * 1000;

function termBoundary(year, month) {
    return new Date(`${year}-${String(month).padStart(2, "0")}-01T00:00:00+05:30`);
}

function termSchedule(now) {
    const parts = indiaCalendar.formatToParts(now);
    const year = Number(parts.find(({ type }) => type === "year").value);
    const month = Number(parts.find(({ type }) => type === "month").value);

    if (month >= 12) {
        return { term: year * 2 + 2, current: termBoundary(year, 12), next: termBoundary(year + 1, 4) };
    }
    if (month >= 4) {
        return { term: year * 2 + 1, current: termBoundary(year, 4), next: termBoundary(year, 12) };
    }
    return { term: year * 2, current: termBoundary(year - 1, 12), next: termBoundary(year, 4) };
}

export function advanceStudentSemesters(now = new Date()) {
    const { term, current } = termSchedule(now);
    const localCheckpoint = Prisma.sql`(profile."semesterProgressedAt" AT TIME ZONE 'Asia/Kolkata')`;
    const newSemester = Prisma.sql`(
        profile.semester + ${term} - 2 * EXTRACT(YEAR FROM ${localCheckpoint})::int
        - CASE
            WHEN EXTRACT(MONTH FROM ${localCheckpoint}) = 12 THEN 2
            WHEN EXTRACT(MONTH FROM ${localCheckpoint}) >= 4 THEN 1
            ELSE 0
          END
    )`;

    // Evaluate the increment and update the checkpoint in the same statement.
    return prisma.$executeRaw`
        UPDATE "StudentProfile" AS profile
        SET semester = CASE WHEN ${newSemester} > 8 THEN NULL ELSE ${newSemester} END,
            status = CASE WHEN ${newSemester} > 8 THEN 'ALUMNI'::"StudentStatus" ELSE profile.status END,
            "semesterProgressedAt" = ${current}::timestamptz
        WHERE profile.status = 'ACTIVE'
          AND profile.semester BETWEEN 1 AND 8
          AND profile."semesterProgressedAt" < ${current}::timestamptz
          AND EXISTS (
              SELECT 1 FROM "User" AS account
              WHERE account.id = profile."userId" AND account.role = 'STUDENT'
          )
    `;
}

export function startSemesterProgression() {
    let checkedTerm;

    async function check() {
        const now = new Date();
        const { term, next } = termSchedule(now);
        try {
            if (checkedTerm !== term) {
                const count = await advanceStudentSemesters(now);
                checkedTerm = term;
                if (count > 0) console.log(`Updated semester progression for ${count} students.`);
            }
            const delay = Math.max(0, next.getTime() - Date.now());
            setTimeout(check, Math.min(delay, maxTimerDelay)).unref();
        } catch (error) {
            console.error("Semester progression failed:", error);
            setTimeout(check, retryDelay).unref();
        }
    }

    void check();
}
