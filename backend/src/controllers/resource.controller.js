import {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource,
} from "../services/resource.service.js";

import { createResourceSchema } from "../validator/resource.validator.js";

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
        const { subjectId, type } = req.query;

        const resources = await getResources({
            subjectId,
            type,
        });

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