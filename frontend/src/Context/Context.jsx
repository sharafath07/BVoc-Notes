import React, {
    useState,
    createContext,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from "react";

import getUsers from "./User";
import api from "../api/axios";
import getSemesters from "./Semester";
import getSubjects from "./Subject";
import getResources from "./Resource";
import getProgram from "./Program";

export const Context = createContext();

function ContextProvider({ children }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

    const [isLoading, setIsLoading] = useState(false);
    const [resourcesLoading, setResourcesLoading] = useState(false);
    const [usersLoading, setUsersLoading] = useState(false);

    /* CACHE / REQUEST STATE */

    const [resourcesLoaded, setResourcesLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);

    const resourcesRequestRef = useRef(null);
    const usersRequestRef = useRef(null);

    /* ROLE HELPERS */

    const isAdmin = user?.role === "ADMIN";
    const isTeacher = user?.role === "TEACHER";
    const isStudent = user?.role === "STUDENT";

    const canManageSubjects = isAdmin || isTeacher;
    const canManageResources = isAdmin || isTeacher;
    const canManageStudents = isAdmin;
    const canManageFaculty = isAdmin;

    /* LOAD INITIAL ACADEMIC DATA */

    useEffect(() => {
        if (!user) {
            setProgram([]);
            setSemesters([]);
            setSubjects([]);
            setResources([]);
            setStudents([]);
            setFaculty([]);

            setResourcesLoaded(false);
            setUsersLoaded(false);

            resourcesRequestRef.current = null;
            usersRequestRef.current = null;

            return;
        }

        let cancelled = false;

        const loadInitialData = async () => {
            try {
                const [
                    semestersData,
                    subjectsData,
                    programData,
                ] = await Promise.all([
                    getSemesters(backendUrl),
                    getSubjects(backendUrl),
                    getProgram(backendUrl),
                ]);

                if (cancelled) return;

                setSemesters(semestersData || []);
                setSubjects(subjectsData || []);
                setProgram(programData || []);
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "Initial data loading error:",
                        error
                    );
                }
            }
        };

        loadInitialData();

        return () => {
            cancelled = true;
        };
    }, [user, backendUrl]);

    /* RESTORE AUTHENTICATION */

    useEffect(() => {
        let cancelled = false;

        const restoreAuth = async () => {
            const savedToken = localStorage.getItem("token");

            if (!savedToken) {
                setToken(null);
                setUser(null);
                setAuthLoading(false);
                return;
            }

            try {
                setIsLoading(true);

                const response = await api.get(
                    `${backendUrl} /api/auth / me`,
                    {
                        headers: {
                            Authorization: `Bearer ${savedToken} `,
                        },
                    }
                );

                if (cancelled) return;

                if (response.data?.success && response.data.user) {
                    setToken(savedToken);
                    setUser(response.data.user);
                } else {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                if (cancelled) return;

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
                if (!cancelled) {
                    setAuthLoading(false);
                    setIsLoading(false);
                }
            }
        };

        restoreAuth();

        return () => {
            cancelled = true;
        };
    }, [backendUrl]);

    /* FETCH RESOURCES ON DEMAND */

    const fetchResources = useCallback(async (force = false) => {
        if (!user) return [];

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
    }, [user, backendUrl, resourcesLoaded, resources]);

    /* FETCH USERS ON DEMAND */

    const fetchUsers = useCallback(async (force = false) => {
        if (!user || (!isAdmin && !isTeacher)) {
            return [];
        }

        if (!force && usersLoaded) {
            return [...students, ...faculty];
        }

        if (usersRequestRef.current) {
            return usersRequestRef.current;
        }

        setUsersLoading(true);

        const request = (async () => {
            try {
                const data = await getUsers(backendUrl);
                const allUsers = data || [];

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

                setUsersLoaded(true);

                return allUsers;
            } catch (error) {
                console.error("Failed to load users:", error);
                throw error;
            } finally {
                usersRequestRef.current = null;
                setUsersLoading(false);
            }
        })();

        usersRequestRef.current = request;

        return request;
    }, [
        user,
        isAdmin,
        isTeacher,
        backendUrl,
        usersLoaded,
        students,
        faculty,
    ]);

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
        isLoading,
    ]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;