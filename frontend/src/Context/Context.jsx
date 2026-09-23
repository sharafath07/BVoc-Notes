import React, {
    useState,
    createContext,
    useEffect,
    useMemo,
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


    /* ---------------------------------------------------------------------- */
    /*                               AUTH STATE                               */
    /* ---------------------------------------------------------------------- */

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const [user, setUser] = useState(null);

    const [authLoading, setAuthLoading] = useState(true);


    /* ---------------------------------------------------------------------- */
    /*                              UI STATE                                  */
    /* ---------------------------------------------------------------------- */

    const [isDark, setIsDark] = useState(false);


    /* ---------------------------------------------------------------------- */
    /*                             APP DATA                                   */
    /* ---------------------------------------------------------------------- */

    const [program, setProgram] = useState([]);
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [resources, setResources] = useState([]);


    /* ---------------------------------------------------------------------- */
    /*                              LOADING                                   */
    /* ---------------------------------------------------------------------- */

    const [isLoading, setIsLoading] = useState(false);


    /* ---------------------------------------------------------------------- */
    /*                            ROLE HELPERS                                */
    /* ---------------------------------------------------------------------- */

    const isAdmin = user?.role === "ADMIN";

    const isTeacher = user?.role === "TEACHER";

    const isStudent = user?.role === "STUDENT";


    /*
     * Subjects
     *
     * ADMIN  → can manage
     * TEACHER → can manage
     */

    const canManageSubjects =
        isAdmin || isTeacher;


    /*
     * Resources
     *
     * ADMIN  → can manage
     * TEACHER → can manage
     */

    const canManageResources =
        isAdmin || isTeacher;


    /*
     * Students
     *
     * ADMIN → can manage
     * TEACHER → view only
     */

    const canManageStudents =
        isAdmin;


    /*
     * Faculties
     *
     * ADMIN → can manage
     * TEACHER → view only
     */

    const canManageFaculty =
        isAdmin;


    /* ---------------------------------------------------------------------- */
    /*                         LOAD APPLICATION DATA                          */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        if (!user) return;


        const loadData = async () => {
            try {
                setIsLoading(true);


                const [
                    semestersData,
                    subjectsData,
                    resourcesData,
                    programData,
                ] = await Promise.all([
                    getSemesters(backendUrl),
                    getSubjects(backendUrl),
                    getResources(backendUrl),
                    getProgram(backendUrl),
                ]);


                setSemesters(semestersData || []);
                setSubjects(subjectsData || []);
                setResources(resourcesData || []);
                setProgram(programData || []);


                /*
                 * Users are only required for the admin dashboard
                 * because teachers can fetch students/faculty lists
                 * directly from their respective pages.
                 */
                if (isAdmin || isTeacher) {
                    const usersData =
                        await getUsers(backendUrl);


                    setStudents(
                        usersData?.filter(
                            (item) =>
                                item.role === "STUDENT"
                        ) || []
                    );


                    setFaculty(
                        usersData?.filter(
                            (item) =>
                                item.role === "TEACHER"
                        ) || []
                    );
                } else {
                    setStudents([]);
                    setFaculty([]);
                }
            } catch (error) {
                console.error(
                    "Context data loading error:",
                    error
                );

                /*
                 * Don't show an alert for every failed background
                 * request. Individual pages can handle their own
                 * API errors.
                 */
            } finally {
                setIsLoading(false);
            }
        };


        loadData();
    }, [user, backendUrl, isAdmin]);


    /* ---------------------------------------------------------------------- */
    /*                         RESTORE AUTHENTICATION                         */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        const restoreAuth = async () => {
            const savedToken =
                localStorage.getItem("token");


            if (!savedToken) {
                setAuthLoading(false);
                return;
            }


            try {
                setIsLoading(true);


                const response = await api.get(
                    `${backendUrl}/api/auth/me`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${savedToken}`,
                        },
                    }
                );


                if (response.data.success) {
                    setToken(savedToken);
                    setUser(response.data.user);
                } else {
                    localStorage.removeItem("token");

                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error(
                    "Failed to restore authentication:",
                    error
                );


                localStorage.removeItem("token");

                setToken(null);
                setUser(null);
            } finally {
                setAuthLoading(false);
                setIsLoading(false);
            }
        };


        restoreAuth();
    }, [backendUrl]);


    /* ---------------------------------------------------------------------- */
    /*                            CONTEXT VALUE                               */
    /* ---------------------------------------------------------------------- */

    const value = useMemo(
        () => ({
            /* Authentication */
            token,
            setToken,
            user,
            setUser,
            authLoading,

            /* Roles */
            isAdmin,
            isTeacher,
            isStudent,

            /* Permissions */
            canManageSubjects,
            canManageResources,
            canManageStudents,
            canManageFaculty,

            /* Theme */
            isDark,
            setIsDark,

            /* Backend */
            backendUrl,

            /* Application data */
            program,
            setProgram,

            semesters,
            setSemesters,

            subjects,
            setSubjects,

            resources,
            setResources,

            students,
            setStudents,

            faculty,
            setFaculty,

            /* Loading */
            isLoading,
            setIsLoading,
        }),
        [
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
            students,
            faculty,

            isLoading,
        ]
    );


    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}


export default ContextProvider;