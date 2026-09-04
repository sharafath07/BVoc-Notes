import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context/Context";

function ProtectedRoute({
    children,
    toUrl = "/login",
    adminOnly = false,
}) {
    const { token, user, authLoading } = useContext(Context);

    // Don't redirect while restoring authentication
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    // Not logged in
    if (!token || !user) {
        return <Navigate to={toUrl} replace />;
    }

    // Admin-only route
    if (adminOnly && user.role !== "ADMIN") {
        return <Navigate to={toUrl} replace />;
    }

    return children;
}

export default ProtectedRoute;