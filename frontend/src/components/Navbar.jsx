import React, { useContext, useState } from 'react'
import { Context } from '../Context/Context.jsx'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
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
                `${backendUrl}/api/auth/logout`
            )

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

    // =========================
    // Animation variants
    // =========================

    const navContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.07,
            },
        },
    }

    const navItemVariants = {
        hidden: {
            opacity: 0,
            y: -8,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.25,
            },
        },
    }

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            height: 0,
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.25,
                ease: 'easeIn',
            },
        },
    }

    const mobileItemVariants = {
        hidden: {
            opacity: 0,
            x: -12,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
            },
        },
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

                <motion.div
                    className="shrink-0"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                    }}
                >
                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        <motion.h1
                            className="text-3xl font-caacupe sm:text-4xl md:text-5xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            BVOC SD
                        </motion.h1>
                    </Link>
                </motion.div>


                {/* Desktop Navigation */}

                <motion.div
                    className="hidden items-center gap-5 font-jetbrains md:flex lg:gap-7"
                    variants={navContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={navItemVariants}>
                        <NavLink
                            to="/"
                            className={navLinkClass}
                        >
                            Home
                        </NavLink>
                    </motion.div>

                    <motion.div variants={navItemVariants}>
                        <NavLink
                            to="/about"
                            className={navLinkClass}
                        >
                            About
                        </NavLink>
                    </motion.div>

                    <motion.div variants={navItemVariants}>
                        <NavLink
                            to="/faculty"
                            className={navLinkClass}
                        >
                            Faculty
                        </NavLink>
                    </motion.div>

                    {token && (
                        <motion.div variants={navItemVariants}>
                            <NavLink
                                to="/resources"
                                className={navLinkClass}
                            >
                                Resources
                            </NavLink>
                        </motion.div>
                    )}

                    <motion.div variants={navItemVariants}>
                        <NavLink
                            to="/contact"
                            className={navLinkClass}
                        >
                            Contact
                        </NavLink>
                    </motion.div>
                </motion.div>


                {/* Desktop Actions */}

                <motion.div
                    className="hidden items-center gap-3 md:flex"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.35,
                        delay: 0.15,
                    }}
                >
                    {/* Dark Mode */}

                    <motion.button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle dark mode"
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className={`rounded-xl border p-2 transition-colors duration-200 ${isDark
                            ? 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                            : 'border-gray-300 bg-white hover:bg-gray-100'
                            }`}
                    >
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <motion.div
                                key={isDark ? 'sun' : 'moon'}
                                initial={{
                                    opacity: 0,
                                    rotate: -90,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    rotate: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    rotate: 90,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                {isDark ? (
                                    <Sun size={20} />
                                ) : (
                                    <Moon size={20} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>


                    {/* Sign In / Logout */}

                    <motion.button
                        type="button"
                        onClick={handleSignInAndOut}
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.96,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className={`rounded-lg border px-3 py-1.5 text-sm ${isDark
                            ? 'border-gray-700 hover:bg-white hover:text-black'
                            : 'border-gray-300 hover:bg-black hover:text-white'
                            }`}
                    >
                        {token ? 'Logout' : 'Sign In/Sign Up'}
                    </motion.button>
                </motion.div>


                {/* Mobile Actions */}

                <div className="flex items-center gap-2 md:hidden">

                    {/* Dark Mode */}

                    <motion.button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle dark mode"
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className={`rounded-xl border p-2 ${isDark
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <motion.div
                                key={isDark ? 'sun-mobile' : 'moon-mobile'}
                                initial={{
                                    opacity: 0,
                                    rotate: -90,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    rotate: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    rotate: 90,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                {isDark ? (
                                    <Sun size={19} />
                                ) : (
                                    <Moon size={19} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>


                    {/* Menu */}

                    <motion.button
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
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.92,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className={`rounded-xl border p-2 ${isDark
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <motion.div
                                key={
                                    isMenuOpen
                                        ? 'close'
                                        : 'menu'
                                }
                                initial={{
                                    opacity: 0,
                                    rotate: -45,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    rotate: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    rotate: 45,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                {isMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>


            {/* =========================
                MOBILE MENU
            ========================= */}

            <AnimatePresence initial={false}>
                {isMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`overflow-hidden border-t md:hidden ${isDark
                            ? 'border-gray-800 bg-gray-950'
                            : 'border-gray-200 bg-white'
                            }`}
                    >
                        <motion.div
                            className="flex flex-col px-5 pb-5 pt-3 font-jetbrains sm:px-6"
                            variants={navContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={mobileItemVariants}>
                                <NavLink
                                    to="/"
                                    onClick={closeMenu}
                                    className={`block border-b py-3 ${isDark
                                        ? 'border-gray-800'
                                        : 'border-gray-200'
                                        } ${navLinkClass({
                                            isActive: false,
                                        })}`}
                                >
                                    Home
                                </NavLink>
                            </motion.div>

                            <motion.div variants={mobileItemVariants}>
                                <NavLink
                                    to="/about"
                                    onClick={closeMenu}
                                    className={`block border-b py-3 ${isDark
                                        ? 'border-gray-800'
                                        : 'border-gray-200'
                                        } ${navLinkClass({
                                            isActive: false,
                                        })}`}
                                >
                                    About
                                </NavLink>
                            </motion.div>

                            <motion.div variants={mobileItemVariants}>
                                <NavLink
                                    to="/faculty"
                                    onClick={closeMenu}
                                    className={`block border-b py-3 ${isDark
                                        ? 'border-gray-800'
                                        : 'border-gray-200'
                                        } ${navLinkClass({
                                            isActive: false,
                                        })}`}
                                >
                                    Faculty
                                </NavLink>
                            </motion.div>

                            {token && (
                                <motion.div
                                    variants={mobileItemVariants}
                                >
                                    <NavLink
                                        to="/resources"
                                        onClick={closeMenu}
                                        className={`block border-b py-3 ${isDark
                                            ? 'border-gray-800'
                                            : 'border-gray-200'
                                            } ${navLinkClass({
                                                isActive: false,
                                            })}`}
                                    >
                                        Resources
                                    </NavLink>
                                </motion.div>
                            )}

                            <motion.div variants={mobileItemVariants}>
                                <NavLink
                                    to="/contact"
                                    onClick={closeMenu}
                                    className={`block border-b py-3 ${isDark
                                        ? 'border-gray-800'
                                        : 'border-gray-200'
                                        } ${navLinkClass({
                                            isActive: false,
                                        })}`}
                                >
                                    Contact
                                </NavLink>
                            </motion.div>


                            {/* Mobile Login / Logout */}

                            <motion.button
                                type="button"
                                onClick={handleSignInAndOut}
                                whileHover={{
                                    scale: 1.01,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                variants={mobileItemVariants}
                                className={`mt-4 w-full rounded-lg border px-4 py-2.5 text-sm font-medium ${isDark
                                    ? 'border-gray-700 hover:bg-white hover:text-black'
                                    : 'border-gray-300 hover:bg-black hover:text-white'
                                    }`}
                            >
                                {token
                                    ? 'Logout'
                                    : 'Sign In / Sign Up'}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar