import express from "express";

import {
    createResourceController,
    getResourcesController,
    getResourceController,
} from "../controllers/resource.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getResourcesController);

router.get("/:id", authenticate, getResourceController);

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    createResourceController
);

export default router;