import {
    createResource,
    getResources,
    getResourceAvailability,
    getResourceById,
    updateResource,
    deleteResource,
} from "../services/resource.service.js";

import { createResourceSchema } from "../validator/resource.validator.js";

const cardsQuery = createResourceSchema.pick({ subjectId: true, type: true });

export async function getResourceAvailabilityController(_req, res) {
    try {
        const availability = await getResourceAvailability();
        return res.json({ success: true, availability });
    } catch (error) {
        console.error("Failed to load resource availability:", error);
        return res.status(500).json({ success: false, message: "Resource availability could not be loaded." });
    }
}

export async function createResourceController(req, res) {
    try {
        const data = createResourceSchema.parse(req.body);

        const resource = await createResource(
            data,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Resource created successfully",
            resource,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export async function getResourcesController(req, res) {
    try {
        const {
            programId,
            subjectId,
            type,
            view,
        } = req.query;

        const cardsOnly = view === "cards";
        if (cardsOnly && !cardsQuery.safeParse({ subjectId, type }).success) {
            return res.status(400).json({
                success: false,
                message: "Select a valid subject and resource type.",
            });
        }

        const resources = await getResources({
            programId,
            subjectId,
            type,
            cardsOnly,
        });

        if (cardsOnly) res.set("Cache-Control", "private, max-age=30");
        res.status(200).json({
            success: true,
            resources,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch resources",
        });
    }
}

export async function getResourceController(req, res) {
    try {
        const resource = await getResourceById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        res.status(200).json({
            success: true,
            resource,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch resource",
        });
    }
}

// UPDATE RESOURCE
export async function updateResourceController(req, res, next) {
    try {
        const { id } = req.params;

        const resource = await updateResource(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Resource updated successfully",
            resource,
        });
    } catch (error) {
        next(error);
    }
}

// DELETE RESOURCE
export async function deleteResourceController(req, res) {
    try {
        const { id } = req.params;

        await deleteResource(id);

        return res.status(200).json({
            success: true,
            message: "Resource deleted successfully",
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Resource not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to delete resource",
        });
    }
}
