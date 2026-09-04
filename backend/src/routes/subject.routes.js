import express from "express";

import {
    getAllSubjectsController,
    getSubjectsBySemesterController,
    updateSubjectController,
    deleteSubjectController,
} from "../controllers/subject.controller.js";

import {
    authenticate,
    authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// GET all subjects
router.get(
    "/",
    authenticate,
    getAllSubjectsController
);


// GET subjects by semester
router.get(
    "/semester/:semesterId",
    authenticate,
    getSubjectsBySemesterController
);


// UPDATE subject
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    updateSubjectController
);


// DELETE subject
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    deleteSubjectController
);


export default router;