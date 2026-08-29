import {
    getAllSubjects,
    getSubjectsBySemester,
} from "../services/subject.service.js";


// GET /api/subjects
export async function getAllSubjectsController(req, res) {
    try {
        const subjects = await getAllSubjects();

        return res.status(200).json({
            success: true,
            subjects,
        });
    } catch (error) {
        console.error("Get all subjects error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch subjects",
        });
    }
}


// GET /api/semesters/:semesterId/subjects
export async function getSubjectsBySemesterController(req, res) {
    try {
        const { semesterId } = req.params;

        if (!semesterId) {
            return res.status(400).json({
                success: false,
                message: "Semester ID is required",
            });
        }

        const subjects = await getSubjectsBySemester(
            semesterId
        );

        return res.status(200).json({
            success: true,
            subjects,
        });
    } catch (error) {
        console.error(
            "Get subjects by semester error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch subjects",
        });
    }
}