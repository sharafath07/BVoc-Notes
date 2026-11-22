import { useState } from "react";
import { UserRound } from "lucide-react";

function imageSource(value) {
    if (!value) return null;
    try {
        const url = new URL(value);
        if (url.protocol !== "https:" || url.username || url.password) return null;
        if (url.hostname !== "drive.google.com") return url.href;
        const fileId = url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/)?.[1] || url.searchParams.get("id");
        if (!fileId || !/^[\w-]+$/.test(fileId)) return null;
        const thumbnail = new URL("https://drive.google.com/thumbnail");
        thumbnail.searchParams.set("id", fileId);
        thumbnail.searchParams.set("sz", "w256");
        const resourceKey = url.searchParams.get("resourcekey");
        if (resourceKey) thumbnail.searchParams.set("resourcekey", resourceKey);
        return thumbnail.href;
    } catch {
        return null;
    }
}

export default function ProfileAvatar({ user, className = "" }) {
    const [failedSource, setFailedSource] = useState(null);
    const source = imageSource(user?.profileImageUrl);
    const initials = user?.name?.trim().split(/\s+/).slice(0, 2).map(([first]) => first).join("").toUpperCase();

    return (
        <span aria-hidden="true" className={`profile-avatar ${className}`}>
            {source && failedSource !== source ? (
                <img src={source} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setFailedSource(source)} />
            ) : initials || <UserRound size="55%" />}
        </span>
    );
}
