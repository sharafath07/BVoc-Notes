import { getAllPrograms } from "../services/program.service.js";

export async function getProgramsController(req, res) {
    try {
        const programs = await getAllPrograms();

        return res.status(200).json({
            success: true,
            programs,
        });
    } catch (error) {
        console.error("Get programs error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch programs",
        });
    }
}