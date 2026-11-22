import { ProfileUpdateError, updateProfile } from "../services/profile.service.js";
import { profileUpdateSchema } from "../validator/account.validator.js";

export async function updateProfileController(req, res) {
    const parsed = profileUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
    }

    try {
        const user = await updateProfile(req.user.id, parsed.data);
        return res.json({ success: true, user });
    } catch (error) {
        if (error instanceof ProfileUpdateError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        if (error.code === "P2002") {
            const constraint = error.meta?.driverAdapterError?.cause?.constraint;
            const usernameTaken = (error.meta?.target ?? constraint?.fields)?.includes("username") || constraint?.index === "User_username_key";
            const message = usernameTaken ? "That username is already taken." : "That email is already in use.";
            return res.status(409).json({ success: false, message });
        }
        if (error.code === "P2025") {
            return res.status(409).json({ success: false, message: "Your account changed while saving. Reload your profile and try again." });
        }
        console.error("Profile update failed:", error);
        return res.status(500).json({ success: false, message: "Could not save your profile. Try again." });
    }
}
