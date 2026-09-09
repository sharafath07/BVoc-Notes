import express from "express";

import {
    getSemestersController,
    // createSemesterController,
} from "../controllers/semester.controller.js";

import {
    getSubjectsBySemesterController,
} from "../controllers/subject.controller.js";

import {
    authenticate,
    // authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();


// GET semesters
router.get(
    "/",
    authenticate,
    getSemestersController
);


// CREATE semester
// router.post(
//     "/",
//     authenticate,
//     authorize("ADMIN"),
//     createSemesterController
// );


// GET subjects by semester
router.get(
    "/:semesterId/subjects",
    authenticate,
    getSubjectsBySemesterController
);


export default router;