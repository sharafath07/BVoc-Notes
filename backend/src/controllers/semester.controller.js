import {
    getAllSemesters,
    // createSemester,
} from "../services/semester.service.js";


export async function getSemestersController(req, res) {
    try {
        const { programId } = req.query;

        const semesters = await getAllSemesters(programId);

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


// export async function createSemesterController(req, res) {
//     try {
//         const { number, programId } = req.body;

//         if (
//             number === undefined ||
//             !programId
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Semester number and program ID are required",
//             });
//         }

//         if (
//             !Number.isInteger(number) ||
//             number < 1
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Semester number must be a positive integer",
//             });
//         }

//         const semester = await createSemester(
//             number,
//             programId
//         );

//         return res.status(201).json({
//             success: true,
//             message: "Semester created successfully",
//             semester,
//         });
//     } catch (error) {
//         console.error("Create semester error:", error);

//         if (error.message === "Program not found") {
//             return res.status(404).json({
//                 success: false,
//                 message: error.message,
//             });
//         }

//         if (
//             error.message ===
//             "Semester already exists for this program"
//         ) {
//             return res.status(409).json({
//                 success: false,
//                 message: error.message,
//             });
//         }

//         return res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }