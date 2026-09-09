import express from "express";

import {
    getProgramsController,
} from "../controllers/program.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    getProgramsController
);

export default router;