import express from "express";

import {
    createResourceController,
    getResourcesController,
    getResourceController,
    updateResourceController,
    deleteResourceController,
} from "../controllers/resource.controller.js";

import {
    authenticate,
    authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    getResourcesController
);

router.get(
    "/:id",
    authenticate,
    getResourceController
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    createResourceController
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    updateResourceController
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "TEACHER"),
    deleteResourceController
);

export default router;