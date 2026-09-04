import {
    getAllUsers,
    updateUser,
    deleteUser,
} from "../services/user.service.js";


// GET /api/users
export async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsers();

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("Get all users error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
}


// PUT /api/users/:id
export async function updateUserController(req, res) {
    try {
        const { id } = req.params;

        const user = await updateUser(id, req.body);

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        console.error("Update user error:", error);

        if (error.message === "User not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Email already exists") {
            return res.status(409).json({
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


// DELETE /api/users/:id
export async function deleteUserController(req, res) {
    try {
        const { id } = req.params;

        await deleteUser(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Delete user error:", error);

        if (error.message === "User not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
}