import {
    getAllSubjects,
    getSubjectsBySemester,
    updateSubject,
    deleteSubject,
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


// PUT /api/subjects/:id
export async function updateSubjectController(req, res) {
    try {
        const { id } = req.params;

        const subject = await updateSubject(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Subject updated successfully",
            subject,
        });
    } catch (error) {
        console.error("Update subject error:", error);

        if (error.message === "Subject not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Semester not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}


// DELETE /api/subjects/:id
export async function deleteSubjectController(req, res) {
    try {
        const { id } = req.params;

        await deleteSubject(id);

        return res.status(200).json({
            success: true,
            message: "Subject deleted successfully",
        });
    } catch (error) {
        console.error("Delete subject error:", error);

        if (error.message === "Subject not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to delete subject",
        });
    }
}