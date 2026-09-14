import React, { useContext, useState } from "react";
import { Mail, Phone, GraduationCap } from "lucide-react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Context } from "../../Context/Context";
import { NavLink, Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
    containerVariants,
    cardVariants,
    buttonVariants,
} from "../../animations";

function AdminNavbar() {
    const {
        token,
        setToken,
        isDark,
        setIsDark,
        backendUrl,
        setUser,
        setIsLoading
    } = useContext(Context);

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleSignInAndOut() {
        if (token) {
            handleSignOut();
        } else {
            navigate("/login");
            setIsMenuOpen(false);
        }
    }

    async function handleSignOut() {
        try {
            setIsLoading(true);
            const response = await api.post(
                `${backendUrl}/api/auth/logout`,
                {}
            );

            if (response.data.success) {
                localStorage.removeItem("token");
                setToken("");
                setUser("");
                setIsMenuOpen(false);
            }
        } catch (error) {
            console.error("Logout failed:", error);

            alert(
                error.response?.data?.message || "Logout Failed"
            );
        } finally {
            setIsLoading(false);
        }
    }

    const navItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            name: "Students",
            path: "/admin/dashboard/students",
        },
        {
            name: "Faculties",
            path: "/admin/dashboard/faculties",
        },
        {
            name: "Subjects",
            path: "/admin/dashboard/subjects",
        },
        {
            name: "Resources",
            path: "/admin/dashboard/resources",
        },
    ];

    return (
        <div>
            <nav
                className={`fixed left-0 right-0 top-0 z-[99] border-b font-roboto ${isDark
                    ? "border-gray-800 bg-gray-950 text-white"
                    : "border-gray-200 bg-white text-gray-900"
                    }`}
            >
                {/* Main Navbar */}
                <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:h-[78px] sm:px-6 lg:h-[10vh] lg:px-8">

                    {/* Logo */}
                    <motion.div
                        className="shrink-0"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                    >
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.h1
                                className="font-caacupe text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                BVOC SD
                            </motion.h1>
                        </Link>
                    </motion.div>


                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden items-center gap-3 font-jetbrains md:flex lg:gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {navItems.map((item) => (
                            <motion.div
                                key={item.path}
                                variants={cardVariants}
                            >
                                <NavLink
                                    to={item.path}
                                    className="nav-link"
                                >
                                    {item.name}
                                </NavLink>
                            </motion.div>
                        ))}
                    </motion.div>


                    {/* Desktop Actions */}
                    <motion.div
                        className="hidden items-center gap-3 md:flex"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.15,
                            ease: "easeOut",
                        }}
                    >
                        {/* Dark Mode */}
                        <motion.button
                            onClick={() => setIsDark(!isDark)}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`rounded-xl border p-1.5 ${isDark
                                ? "border-gray-700"
                                : "border-gray-300"
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >
                                <motion.span
                                    key={isDark ? "sun" : "moon"}
                                    initial={{
                                        opacity: 0,
                                        rotate: -45,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 45,
                                        scale: 0.8,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="flex"
                                >
                                    {isDark ? (
                                        <Sun size={20} />
                                    ) : (
                                        <Moon size={20} />
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>


                        {/* Sign In / Logout */}
                        <motion.button
                            onClick={handleSignInAndOut}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="rounded-lg border px-3 py-1.5 text-sm lg:px-4"
                        >
                            {token ? "Logout" : "Sign In/Sign Up"}
                        </motion.button>
                    </motion.div>


                    {/* Mobile Actions */}
                    <motion.div
                        className="flex items-center gap-2 md:hidden"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.15,
                        }}
                    >
                        {/* Dark Mode */}
                        <motion.button
                            onClick={() => setIsDark(!isDark)}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`rounded-xl border p-1.5 ${isDark
                                ? "border-gray-700"
                                : "border-gray-300"
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >
                                <motion.span
                                    key={isDark ? "sun" : "moon"}
                                    initial={{
                                        opacity: 0,
                                        rotate: -45,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 45,
                                        scale: 0.8,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="flex"
                                >
                                    {isDark ? (
                                        <Sun size={19} />
                                    ) : (
                                        <Moon size={19} />
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>


                        {/* Menu */}
                        <motion.button
                            onClick={() =>
                                setIsMenuOpen(!isMenuOpen)
                            }
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`rounded-xl border p-1.5 ${isDark
                                ? "border-gray-700"
                                : "border-gray-300"
                                }`}
                            aria-label="Toggle navigation menu"
                        >
                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >
                                <motion.span
                                    key={
                                        isMenuOpen
                                            ? "close"
                                            : "menu"
                                    }
                                    initial={{
                                        opacity: 0,
                                        rotate: -45,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 45,
                                        scale: 0.8,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="flex"
                                >
                                    {isMenuOpen ? (
                                        <X size={21} />
                                    ) : (
                                        <Menu size={21} />
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                </div>


                {/* Mobile Menu */}
                <AnimatePresence initial={false}>
                    {isMenuOpen && (
                        <motion.div
                            initial={{
                                height: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={`overflow-hidden border-t md:hidden ${isDark
                                ? "border-gray-800 bg-gray-950"
                                : "border-gray-200 bg-white"
                                }`}
                        >
                            <motion.div
                                className="flex flex-col px-4 py-4 sm:px-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >

                                {/* Mobile Navigation */}
                                <motion.div
                                    className="flex flex-col font-jetbrains"
                                    variants={containerVariants}
                                >
                                    {navItems.map((item) => (
                                        <motion.div
                                            key={item.path}
                                            variants={cardVariants}
                                        >
                                            <NavLink
                                                to={item.path}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                                className={`block border-b py-3 text-sm transition ${isDark
                                                    ? "border-gray-800"
                                                    : "border-gray-200"
                                                    }`}
                                            >
                                                {item.name}
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </motion.div>


                                {/* Mobile Sign In / Logout */}
                                <motion.button
                                    variants={cardVariants}
                                    onClick={handleSignInAndOut}
                                    whileHover={{
                                        scale: 1.01,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                    className="mt-4 w-full rounded-lg border px-4 py-2.5 text-sm font-medium"
                                >
                                    {token
                                        ? "Logout"
                                        : "Sign In/Sign Up"}
                                </motion.button>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Navbar Spacer */}
            <div className="h-[72px] sm:h-[78px] lg:h-[10vh]" />
        </div>
    );
}

export default AdminNavbar;