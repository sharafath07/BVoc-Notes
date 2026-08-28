import express from "express";

import {
    getSemestersController,
} from "../controllers/semester.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    getSemestersController
);

export default router;