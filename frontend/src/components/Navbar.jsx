import React, { useContext, useState } from 'react'
import { Context } from '../Context/Context.jsx'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

function Navbar() {
    const {
        token,
        isDark,
        setIsDark,
        setToken,
        setUser,
        backendUrl
    } = useContext(Context)

    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleSignInAndOut() {
        if (token) {
            handleSignOut()
        } else {
            setIsMenuOpen(false)
            navigate('/login')
        }
    }

    async function handleSignOut() {
        try {
            const response = await api.post(
                `${backendUrl}/api/auth/logout`)

            if (response.data.success) {
                localStorage.removeItem('token')
                setToken('')
                setUser('')
                setIsMenuOpen(false)
                navigate('/')
            }
        } catch (error) {
            console.error('Logout failed:', error)

            alert(
                error.response?.data?.message || 'Logout Failed'
            )
        }
    }

    const navLinkClass = ({ isActive }) =>
        `block transition-colors duration-200 ${isActive
            ? isDark
                ? 'text-white'
                : 'text-black'
            : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-black'
        }`

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[99] w-full border-b font-roboto transition-colors duration-300 ${isDark
                ? 'border-gray-800 bg-gray-950 text-white'
                : 'border-gray-200 bg-white text-gray-900'
                }`}
        >
            {/* =========================
                DESKTOP / MAIN NAVBAR
            ========================= */}

            <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[80px] md:px-8 lg:px-10">

                {/* Logo */}
                <div className="shrink-0">
                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        <h1 className="text-3xl font-caacupe sm:text-4xl md:text-5xl">
                            BVOC SD
                        </h1>
                    </Link>
                </div>


                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 font-jetbrains md:flex lg:gap-7">
                    <NavLink
                        to="/"
                        className={navLinkClass}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={navLinkClass}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/faculty"
                        className={navLinkClass}
                    >
                        Faculty
                    </NavLink>

                    {token && (
                        <NavLink
                            to="/resources"
                            className={navLinkClass}
                        >
                            Resources
                        </NavLink>
                    )}

                    <NavLink
                        to="/contact"
                        className={navLinkClass}
                    >
                        Contact
                    </NavLink>
                </div>


                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle dark mode"
                        className={`rounded-xl border p-2 transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
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
                        className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
                            ? 'border-gray-700 hover:bg-white hover:text-black'
                            : 'border-gray-300 hover:bg-black hover:text-white'
                            }`}
                    >
                        {token ? 'Logout' : 'Sign In/Sign Up'}
                    </button>
                </div>


                {/* Mobile Actions */}
                <div className="flex items-center gap-2 md:hidden">

                    {/* Dark Mode */}
                    <button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle dark mode"
                        className={`rounded-xl border p-2 transition-all duration-200 active:scale-95 ${isDark
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        {isDark ? (
                            <Sun size={19} />
                        ) : (
                            <Moon size={19} />
                        )}
                    </button>


                    {/* Menu */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen(!isMenuOpen)
                        }
                        aria-label={
                            isMenuOpen
                                ? 'Close menu'
                                : 'Open menu'
                        }
                        aria-expanded={isMenuOpen}
                        className={`rounded-xl border p-2 transition-all duration-200 active:scale-95 ${isDark
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        {isMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>
            </div>


            {/* =========================
                MOBILE MENU
            ========================= */}

            <div
                className={`overflow-hidden border-t transition-all duration-300 md:hidden ${isMenuOpen
                    ? 'max-h-[500px] opacity-100'
                    : 'max-h-0 border-transparent opacity-0'
                    } ${isDark
                        ? 'border-gray-800 bg-gray-950'
                        : 'border-gray-200 bg-white'
                    }`}
            >
                <div className="flex flex-col px-5 pb-5 pt-3 font-jetbrains sm:px-6">

                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className={`border-b py-3 ${isDark
                            ? 'border-gray-800'
                            : 'border-gray-200'
                            } ${navLinkClass({ isActive: false })}`}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/about"
                        onClick={closeMenu}
                        className={`border-b py-3 ${isDark
                            ? 'border-gray-800'
                            : 'border-gray-200'
                            } ${navLinkClass({ isActive: false })}`}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/faculty"
                        onClick={closeMenu}
                        className={`border-b py-3 ${isDark
                            ? 'border-gray-800'
                            : 'border-gray-200'
                            } ${navLinkClass({ isActive: false })}`}
                    >
                        Faculty
                    </NavLink>

                    {token && (
                        <NavLink
                            to="/resources"
                            onClick={closeMenu}
                            className={`border-b py-3 ${isDark
                                ? 'border-gray-800'
                                : 'border-gray-200'
                                } ${navLinkClass({ isActive: false })}`}
                        >
                            Resources
                        </NavLink>
                    )}

                    <NavLink
                        to="/contact"
                        onClick={closeMenu}
                        className={`border-b py-3 ${isDark
                            ? 'border-gray-800'
                            : 'border-gray-200'
                            } ${navLinkClass({ isActive: false })}`}
                    >
                        Contact
                    </NavLink>


                    {/* Mobile Login / Logout */}
                    <button
                        type="button"
                        onClick={handleSignInAndOut}
                        className={`mt-4 w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${isDark
                            ? 'border-gray-700 hover:bg-white hover:text-black'
                            : 'border-gray-300 hover:bg-black hover:text-white'
                            }`}
                    >
                        {token
                            ? 'Logout'
                            : 'Sign In / Sign Up'}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar