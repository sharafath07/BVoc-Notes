import express from "express";

import {
    getAllUsersController,
    updateUserController,
    deleteUserController,
} from "../controllers/users.controller.js";

import {
    authenticate,
    authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// GET all users
router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getAllUsersController
);


// UPDATE user
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    updateUserController
);


// DELETE user
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteUserController
);

export default router;