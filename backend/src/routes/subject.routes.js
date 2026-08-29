import express from "express";

import {
    getAllSubjectsController,
} from "../controllers/subject.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();


// GET all subjects
router.get(
    "/",
    authenticate,
    getAllSubjectsController
);
export default router;