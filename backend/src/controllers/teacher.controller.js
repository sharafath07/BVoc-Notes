import {
    registerTeacher,
    getTeachers,
    deleteTeacher,
} from "../services/teacher.service.js";

import {
    teacherRegistrationSchema,
} from "../validator/teacher.validator.js";


export async function registerTeacherController(req, res) {
    try {
        const result =
            teacherRegistrationSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        const teacher = await registerTeacher({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        });

        return res.status(201).json({
            success: true,
            message: "Teacher registered successfully",
            teacher,
        });
    } catch (error) {
        console.error(
            "Teacher registration error:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}


export async function getTeachersController(req, res) {
    try {
        const teachers = await getTeachers();

        return res.status(200).json({
            success: true,
            teachers,
        });
    } catch (error) {
        console.error(
            "Get teachers error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch teachers",
        });
    }
}


export async function deleteTeacherController(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Teacher ID is required",
            });
        }

        const result = await deleteTeacher(id);

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        console.error(
            "Delete teacher error:",
            error
        );

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}