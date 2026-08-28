import React, { useState, createContext, useEffect, Children } from 'react'
// import axios from 'axios';

export const Context = createContext()

function ContextProvider(props) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState('')
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState('');
    const [students, setStudents] = useState();
    const [resources, setResourses] = useState();

    const value = {
        backendUrl,
        token,
        setToken,
        isDark,
        setIsDark,
        user,
        setUser
    }

    useEffect(() => {
        if (user.role == "ADMIN") {

        }
    }, [user])

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider