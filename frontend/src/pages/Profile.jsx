import { useContext, useState } from "react";
import { DepartmentHeading } from "../components/DepartmentPage";
import ProfileAvatar from "../components/ProfileAvatar";
import { Context } from "../Context/Context";
import api from "../api/axios";

const fieldValues = (user) => ({
    username: user.username || "",
    email: user.email || "",
    profileImageUrl: user.profileImageUrl || "",
});

export default function Profile() {
    const { user, setUser, backendUrl } = useContext(Context);
    const [fields, setFields] = useState(() => fieldValues(user));
    const [detailsPassword, setDetailsPassword] = useState("");
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [saving, setSaving] = useState("");
    const [feedback, setFeedback] = useState(null);
    const normalized = { ...fields, username: fields.username.trim().toLowerCase(), email: fields.email.trim().toLowerCase(), profileImageUrl: fields.profileImageUrl.trim() };
    const original = fieldValues(user);
    const changes = Object.fromEntries(Object.entries(normalized).filter(([key, value]) => value !== original[key]));
    const requiresPassword = "username" in changes || "email" in changes;

    function updateField(event) {
        const { name, value } = event.target;
        setFields((current) => ({ ...current, [name]: value }));
    }

    function updatePasswordField(event) {
        const { name, value } = event.target;
        setPasswords((current) => ({ ...current, [name]: value }));
    }

    async function save(section, payload, onSuccess) {
        setSaving(section);
        setFeedback(null);
        try {
            const { data } = await api.patch(`${backendUrl}/api/auth/me`, payload);
            setUser((current) => current?.id === data.user.id ? { ...current, ...data.user } : current);
            onSuccess(data.user);
            setFeedback({ section, message: section === "details" ? "Profile saved." : "Password changed." });
        } catch (error) {
            setFeedback({ section, error: true, message: error.response?.data?.message || "Could not save. Try again." });
        } finally {
            setSaving("");
        }
    }

    function saveDetails(event) {
        event.preventDefault();
        if (saving || !Object.keys(changes).length) return;
        if ("profileImageUrl" in changes && !changes.profileImageUrl) changes.profileImageUrl = null;
        if (requiresPassword) changes.currentPassword = detailsPassword;
        void save("details", changes, (updatedUser) => {
            setFields(fieldValues(updatedUser));
            setDetailsPassword("");
        });
    }

    function savePassword(event) {
        event.preventDefault();
        if (saving) return;
        if (passwords.newPassword !== passwords.confirmPassword) {
            setFeedback({ section: "password", error: true, message: "The new passwords do not match." });
            return;
        }
        const { currentPassword, newPassword } = passwords;
        void save("password", { currentPassword, newPassword }, () => {
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setDetailsPassword("");
        });
    }

    function showFeedback(section) {
        if (feedback?.section !== section) return null;
        return <p role={feedback.error ? "alert" : "status"} className={feedback.error ? "profile-error" : "profile-success"}>{feedback.message}</p>;
    }

    return (
        <main>
            <DepartmentHeading title="Your profile" description="Manage your account and the photo displayed in Community Chat." />
            <div className="department-container department-section profile-layout">
                <form className="department-card department-form" onSubmit={saveDetails}>
                    <div className="profile-identity">
                        <ProfileAvatar user={user} className="profile-avatar-large" />
                        <div>
                            <h2>{user.name}</h2>
                            <p>{user.role === "TEACHER" ? "Teacher account" : "Student account"}</p>
                        </div>
                    </div>
                    <label>Username
                        <input name="username" value={fields.username} onChange={updateField} autoComplete="username" autoCapitalize="none" spellCheck={false} pattern="[A-Za-z0-9_]{3,24}" title="Use 3–24 letters, numbers, or underscores." maxLength={24} required={"username" in changes} />
                    </label>
                    <label>Email
                        <input name="email" type="email" value={fields.email} onChange={updateField} autoComplete="email" maxLength={254} required />
                    </label>
                    <label>Profile photo URL
                        <input name="profileImageUrl" type="url" value={fields.profileImageUrl} onChange={updateField} maxLength={2048} placeholder="https://…" spellCheck={false} aria-describedby="profile-photo-help" />
                    </label>
                    <p id="profile-photo-help">Use a direct HTTPS image URL or a Google Drive file shared with anyone who has the link. Clear the URL to remove your photo.</p>
                    {requiresPassword && (
                        <label>Current password
                            <input type="password" value={detailsPassword} onChange={(event) => setDetailsPassword(event.target.value)} autoComplete="current-password" required maxLength={128} />
                        </label>
                    )}
                    <button className="department-button" type="submit" disabled={Boolean(saving) || !Object.keys(changes).length}>
                        {saving === "details" ? "Saving…" : "Save profile"}
                    </button>
                    {showFeedback("details")}
                </form>

                <form className="department-card department-form" onSubmit={savePassword}>
                    <h2>Change password</h2>
                    <label>Current password
                        <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={updatePasswordField} autoComplete="current-password" required maxLength={128} />
                    </label>
                    <label>New password
                        <input type="password" name="newPassword" value={passwords.newPassword} onChange={updatePasswordField} autoComplete="new-password" required minLength={8} maxLength={72} />
                    </label>
                    <label>Confirm new password
                        <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={updatePasswordField} autoComplete="new-password" required minLength={8} maxLength={72} />
                    </label>
                    <button className="department-button" type="submit" disabled={Boolean(saving)}>
                        {saving === "password" ? "Saving…" : "Change password"}
                    </button>
                    {showFeedback("password")}
                </form>
            </div>
        </main>
    );
}
