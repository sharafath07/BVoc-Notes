import React, {
    useState,
    createContext,
    useEffect,
    useEffectEvent,
    useMemo,
    useCallback,
    useRef,
} from "react";
import { useLocation } from "react-router-dom";

import getUsers from "./User";
import { getPageData } from "../api/axios";
import getSemesters from "./Semester";
import getSubjects from "./Subject";
import getResources from "./Resource";
import getProgram from "./Program";

export const Context = createContext();

function ContextProvider({ children }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { pathname } = useLocation();
    const needsAcademicData = pathname.startsWith("/admin/dashboard");

    /* AUTH STATE */

    const [token, setToken] = useState(
        () => localStorage.getItem("token") || null
    );

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    /* UI STATE */

    const [isDark, setIsDark] = useState(false);

    /* APPLICATION DATA */

    const [program, setProgram] = useState([]);
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [resources, setResources] = useState([]);

    /* LOADING STATES */

    const [initialLoading, setInitialLoading] = useState(true);
    const [actionLoading, setIsLoading] = useState(false);
    const isLoading = initialLoading || actionLoading;
    const [resourcesLoading, setResourcesLoading] = useState(false);
    const [usersLoading, setUsersLoading] = useState(false);

    /* CACHE / REQUEST STATE */

    const [resourcesLoaded, setResourcesLoaded] = useState(false);
    const [usersLoadedFor, setUsersLoadedFor] = useState(null);

    const resourcesRequestRef = useRef(null);
    const usersRequestRef = useRef(null);

    /* ROLE HELPERS */

    const isAdmin = user?.role === "ADMIN";
    const isTeacher = user?.role === "TEACHER";
    const isStudent = user?.role === "STUDENT";
    const userId = user?.id;
    const usersLoaded = Boolean(userId && usersLoadedFor === userId);

    const canManageSubjects = isAdmin || isTeacher;
    const canManageResources = isAdmin || isTeacher;
    const canManageStudents = isAdmin;
    const canManageFaculty = isAdmin;

    /* LOAD INITIAL ACADEMIC DATA */

    useEffect(() => {
        if (!needsAcademicData) return;
        let cancelled = false;
        getProgram(backendUrl).then((data) => {
            if (!cancelled) setProgram(data || []);
        });
        getSemesters(backendUrl).then((data) => {
            if (!cancelled) setSemesters(data || []);
        });
        getSubjects(backendUrl).then((data) => {
            if (!cancelled) setSubjects(data || []);
        });

        return () => {
            cancelled = true;
        };
    }, [backendUrl, needsAcademicData]);

    /* RESTORE AUTHENTICATION */

    useEffect(() => {
        const controller = new AbortController();

        const restoreAuth = async () => {
            const savedToken = localStorage.getItem("token");

            if (!savedToken) {
                setToken(null);
                setUser(null);
                setAuthLoading(false);
                return;
            }

            const isCurrentSession = () => !controller.signal.aborted && localStorage.getItem("token") === savedToken;

            try {
                const response = await getPageData(
                    `${backendUrl}/api/auth/me`,
                    {
                        signal: controller.signal,
                        headers: {
                            Authorization: `Bearer ${savedToken}`,
                        },
                    }
                );

                if (!isCurrentSession()) return;

                if (response.data?.success && response.data.user) {
                    setToken(savedToken);
                    setUser(response.data.user);
                } else {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                if (!isCurrentSession()) return;

                console.error(
                    "Failed to restore authentication:",
                    error
                );

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                } else {
                    // Preserve the saved token on temporary failures.
                    // Authentication could not be verified, however.
                    setToken(savedToken);
                    setUser(null);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setAuthLoading(false);
                }
            }
        };

        restoreAuth();

        return () => controller.abort();
    }, [backendUrl]);

    /* FETCH RESOURCES ON DEMAND */

    const fetchResources = useCallback(async (force = false) => {
        if (!force && resourcesLoaded) {
            return resources;
        }

        // Reuse an in-flight request rather than sending another.
        if (resourcesRequestRef.current) {
            return resourcesRequestRef.current;
        }

        setResourcesLoading(true);

        const request = (async () => {
            try {
                const data = await getResources(backendUrl);
                const result = data || [];

                setResources(result);
                setResourcesLoaded(true);

                return result;
            } catch (error) {
                console.error("Failed to load resources:", error);
                throw error;
            } finally {
                resourcesRequestRef.current = null;
                setResourcesLoading(false);
            }
        })();

        resourcesRequestRef.current = request;

        return request;
    }, [backendUrl, resourcesLoaded, resources]);

    /* FETCH USERS ON DEMAND */

    const fetchUsers = useCallback(async (force = false) => {
        if (!userId || (!isAdmin && !isTeacher)) {
            return [];
        }

        if (!force && usersLoaded) {
            return [...students, ...faculty];
        }

        if (usersRequestRef.current?.userId === userId) {
            return usersRequestRef.current.promise;
        }

        setUsersLoading(true);

        const request = { userId, promise: null };
        usersRequestRef.current = request;
        request.promise = (async () => {
            try {
                const data = await getUsers(backendUrl);
                const allUsers = data || [];
                if (usersRequestRef.current !== request) return allUsers;

                setStudents(
                    allUsers.filter(
                        (item) => item.role === "STUDENT"
                    )
                );

                setFaculty(
                    allUsers.filter(
                        (item) => item.role === "TEACHER"
                    )
                );

                setUsersLoadedFor(userId);

                return allUsers;
            } catch (error) {
                console.error("Failed to load users:", error);
                throw error;
            } finally {
                if (usersRequestRef.current === request) {
                    usersRequestRef.current = null;
                    setUsersLoading(false);
                }
            }
        })();

        return request.promise;
    }, [
        userId,
        isAdmin,
        isTeacher,
        backendUrl,
        usersLoaded,
        students,
        faculty,
    ]);

    const preloadStaffUsers = useEffectEvent((isCancelled) => {
        void fetchUsers().catch((error) => {
            if (!isCancelled()) alert(error.response?.data?.message || "Could not load users.");
        });
    });
    const onDashboard = pathname === "/admin/dashboard";

    useEffect(() => {
        if (!isAdmin && !isTeacher) {
            usersRequestRef.current = null;
            setStudents([]);
            setFaculty([]);
            setUsersLoadedFor(null);
            setUsersLoading(false);
            return;
        }
        if (onDashboard) return;

        let cancelled = false;
        preloadStaffUsers(() => cancelled);
        return () => { cancelled = true; };
    }, [userId, isAdmin, isTeacher, onDashboard, backendUrl]);

    /* CONTEXT VALUE */

    const value = useMemo(() => ({
        // Authentication
        token,
        setToken,
        user,
        setUser,
        authLoading,

        // Roles
        isAdmin,
        isTeacher,
        isStudent,

        // Permissions
        canManageSubjects,
        canManageResources,
        canManageStudents,
        canManageFaculty,

        // Theme
        isDark,
        setIsDark,

        // Backend
        backendUrl,

        // Academic data
        program,
        setProgram,
        semesters,
        setSemesters,
        subjects,
        setSubjects,

        // Resources
        resources,
        setResources,
        fetchResources,
        resourcesLoading,
        resourcesLoaded,

        // Users
        students,
        setStudents,
        faculty,
        setFaculty,
        fetchUsers,
        usersLoading,
        usersLoaded,

        // General loading
        initialLoading,
        setInitialLoading,
        isLoading,
        setIsLoading,
    }), [
        token,
        user,
        authLoading,
        isAdmin,
        isTeacher,
        isStudent,
        canManageSubjects,
        canManageResources,
        canManageStudents,
        canManageFaculty,
        isDark,
        backendUrl,
        program,
        semesters,
        subjects,
        resources,
        fetchResources,
        resourcesLoading,
        resourcesLoaded,
        students,
        faculty,
        fetchUsers,
        usersLoading,
        usersLoaded,
        initialLoading,
        isLoading,
    ]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
