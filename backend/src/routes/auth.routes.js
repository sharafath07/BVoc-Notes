import { Router } from "express";

import {
    login,
    logout,
    getMe,
} from "../controllers/auth.controller.js";

import {
    registerStudentController,
} from "../controllers/student-registration.controller.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post(
    "/register/student",
    registerStudentController
);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", authenticate, getMe);

export default router;