import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context/Context";
import Loading from "./Loading";

function ProtectedRoute({
    children,
    toUrl = "/login",
    allowedRoles = [],
}) {
    const { token, user, authLoading } = useContext(Context);

    // Wait for authentication restoration
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    // Not authenticated
    if (!token || !user) {
        return <Navigate to={toUrl} replace />;
    }

    // Check role
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to={toUrl} replace />;
    }

    return children;
}

export default ProtectedRoute;