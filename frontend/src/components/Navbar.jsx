import React, { useContext } from 'react'
import { Context } from '../Context/Context.jsx'
import { Moon, Sun } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const {
        token,
        isDark,
        setIsDark,
        setToken,
        backendUrl
    } = useContext(Context)

    const navigate = useNavigate()

    function handleSignInAndOut() {
        if (token) {
            handleSignOut()
        } else {
            navigate('/login')
        }
    }

    async function handleSignOut() {
        try {
            const response = await axios.post(
                `${backendUrl}/api/auth/logout`,
                {}
            )

            if (response.data.success) {
                localStorage.removeItem("token")
                setToken('')
                navigate('/')
            }
        } catch (error) {
            console.error("Logout failed:", error)

            alert(
                error.response?.data?.message || "Logout Failed"
            )
        }
    }

    return (
        <nav
            className={`flex z-[99] flex-row fixed top-0 left-0 right-0 h-[10vh]
            justify-around items-center border-b font-roboto
            transition-colors duration-300
            ${isDark
                    ? 'bg-gray-950 text-white border-gray-800'
                    : 'bg-white text-gray-900 border-gray-200'
                }`}
        >
            <div>
                <Link to="/">
                    <h1 className="text-5xl font-caacupe">
                        BVOC SD
                    </h1>
                </Link>
            </div>

            <div className="flex flex-row items-center gap-3 font-jetbrains">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `nav-link transition-colors duration-200 ${isActive
                            ? isDark
                                ? 'text-white'
                                : 'text-black'
                            : isDark
                                ? 'text-gray-400 hover:text-white'
                                : 'text-gray-500 hover:text-black'
                        }`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `nav-link transition-colors duration-200 ${isActive
                            ? isDark
                                ? 'text-white'
                                : 'text-black'
                            : isDark
                                ? 'text-gray-400 hover:text-white'
                                : 'text-gray-500 hover:text-black'
                        }`
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/faculty"
                    className={({ isActive }) =>
                        `nav-link transition-colors duration-200 ${isActive
                            ? isDark
                                ? 'text-white'
                                : 'text-black'
                            : isDark
                                ? 'text-gray-400 hover:text-white'
                                : 'text-gray-500 hover:text-black'
                        }`
                    }
                >
                    Faculty
                </NavLink>

                {token && (
                    <NavLink
                        to="/resources"
                        className={({ isActive }) =>
                            `nav-link transition-colors duration-200 ${isActive
                                ? isDark
                                    ? 'text-white'
                                    : 'text-black'
                                : isDark
                                    ? 'text-gray-400 hover:text-white'
                                    : 'text-gray-500 hover:text-black'
                            }`
                        }
                    >
                        Resources
                    </NavLink>
                )}

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `nav-link transition-colors duration-200 ${isActive
                            ? isDark
                                ? 'text-white'
                                : 'text-black'
                            : isDark
                                ? 'text-gray-400 hover:text-white'
                                : 'text-gray-500 hover:text-black'
                        }`
                    }
                >
                    Contact
                </NavLink>
            </div>

            <div className="flex flex-row items-center gap-3">
                <button
                    type="button"
                    onClick={() => setIsDark(!isDark)}
                    aria-label="Toggle dark mode"
                    className={`border p-2 rounded-xl transition-all duration-200
                    hover:scale-105 active:scale-95
                    ${isDark
                            ? 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                            : 'border-gray-300 bg-white hover:bg-gray-100'
                        }`}
                >
                    {isDark ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleSignInAndOut}
                    className={`border px-3 py-1 rounded-lg
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                    ${isDark
                            ? 'border-gray-700 hover:bg-white hover:text-black'
                            : 'border-gray-300 hover:bg-black hover:text-white'
                        }`}
                >
                    {token ? 'Logout' : 'Sign In/Sign Up'}
                </button>
            </div>
        </nav>
    )
}

export default Navbar