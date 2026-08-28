import { getAllSemesters } from "../services/semester.service.js";

export async function getSemestersController(req, res) {
    try {
        const semesters = await getAllSemesters();

        return res.status(200).json({
            success: true,
            semesters,
        });
    } catch (error) {
        console.error("Get semesters error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch semesters",
        });
    }
}