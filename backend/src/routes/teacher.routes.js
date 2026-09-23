import { Router } from "express";

import {
    registerTeacherController,
    getTeachersController,
    deleteTeacherController,
} from "../controllers/teacher.controller.js";

import {
    authenticate,
    authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    getTeachersController
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    registerTeacherController
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteTeacherController
);
export default router;