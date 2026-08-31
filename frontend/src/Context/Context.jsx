import React, { useState, createContext, useEffect, Children } from 'react'
import api from '../api/axios'

export const Context = createContext()

function ContextProvider(props) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState('')
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState('');
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
        setResources
    }

    useEffect(() => {
        getSemesters()
        getSubjects()
        getResources()
    }, [user])

    async function getSubjects() {

        try {
            const response = await api.get(`${backendUrl}/api/subjects`)

            if (response.data.success) {
                console.log(response);
                setSubjects(response.data.subjects)
            }
        } catch (error) {
            console.error("Get Subjects:", error)

            alert(
                error.response?.data?.message || "Get Subjects"
            )
        }
    }

    async function getSemesters() {

        try {
            const response = await api.get(`${backendUrl}/api/semesters`)

            if (response.data.success) {
                console.log(response);
                setSemesters(response.data.semesters)
            }
        } catch (error) {
            console.error("Get Semesters:", error)

            alert(
                error.response?.data?.message || "Get Semesters"
            )
        }
    }

    async function getResources() {

        try {
            const response = await api.get(`${backendUrl}/api/resources`)

            if (response.data.success) {
                console.log(response);
                setResources(response.data.resources)
            }
        } catch (error) {
            console.error("Get Resources:", error)

            alert(
                error.response?.data?.message || "Get Resources"
            )
        }
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider