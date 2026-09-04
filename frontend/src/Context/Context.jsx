import React, { useState, createContext, useEffect } from "react";
import getUsers from "./user";
import api from "../api/axios";
import getSemesters from "./Semester";
import getSubjects from "./Subject";
import getResources from "./Resource";

export const Context = createContext();

function ContextProvider(props) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [resources, setResources] = useState([]);

    const value = {
        backendUrl,
        token,
        setToken,
        isDark,
        setIsDark,
        user,
        setUser,
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
        authLoading
    };

    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            try {
                const semestersData = await getSemesters(backendUrl);
                const subjectsData = await getSubjects(backendUrl);
                const resourcesData = await getResources(backendUrl);

                setSemesters(semestersData || []);
                setSubjects(subjectsData || []);
                setResources(resourcesData || []);

                if (user.role === "ADMIN") {
                    const usersData = await getUsers(backendUrl);

                    setStudents(
                        usersData?.filter(
                            (user) => user.role === "STUDENT"
                        ) || []
                    );

                    setFaculty(
                        usersData?.filter(
                            (user) => user.role === "FACULTY"
                        ) || []
                    );
                }
            } catch (error) {
                console.error("Context data loading error:", error);
            }
        };

        loadData();
    }, [user, backendUrl]);

    useEffect(() => {
        const restoreAuth = async () => {
            const savedToken = localStorage.getItem("token");

            if (!savedToken) {
                setAuthLoading(false);
                return;
            }

            try {
                const response = await api.get(
                    `${backendUrl}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${savedToken}`,
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
                console.error("Failed to restore authentication:", error);

                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        restoreAuth();
    }, [backendUrl]);

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;