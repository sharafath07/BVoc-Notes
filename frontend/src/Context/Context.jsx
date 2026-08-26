import React, { useState, createContext, useEffect, Children } from 'react'
// import axios from 'axios';

export const Context = createContext()

function ContextProvider(props) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState('')
    const [isDark, setIsDark] = useState(false);

    const value = {
        backendUrl,
        token,
        setToken,
        isDark,
        setIsDark
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider