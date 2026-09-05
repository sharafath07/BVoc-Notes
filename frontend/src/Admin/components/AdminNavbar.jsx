import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminNavbar() {
    const {
        token,
        setToken,
        isDark,
        setIsDark,
        backendUrl,
        setUser,
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
                    <div className="shrink-0">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <h1 className="font-caacupe text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                BVOC SD
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-3 font-jetbrains md:flex lg:gap-5">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className="nav-link"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`rounded-xl border p-1.5 transition-transform duration-200 hover:scale-105 active:scale-95 ${isDark
                                ? "border-gray-700"
                                : "border-gray-300"
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <Sun size={20} />
                            ) : (
                                <Moon size={20} />
                            )}
                        </button>

                        <button
                            onClick={handleSignInAndOut}
                            className="rounded-lg border px-3 py-1.5 text-sm transition-transform duration-200 hover:scale-105 active:scale-95 lg:px-4"
                        >
                            {token ? "Logout" : "Sign In/Sign Up"}
                        </button>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`rounded-xl border p-1.5 transition-transform duration-200 hover:scale-105 active:scale-95 ${isDark
                                ? "border-gray-700"
                                : "border-gray-300"
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <Sun size={19} />
                            ) : (
                                <Moon size={19} />
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`rounded-xl border p-1.5 transition-transform duration-200 hover:scale-105 active:scale-95 ${isDark
                                ? "border-gray-700"
                                : "border-gray-300"
                                }`}
                            aria-label="Toggle navigation menu"
                        >
                            {isMenuOpen ? (
                                <X size={21} />
                            ) : (
                                <Menu size={21} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden border-t transition-all duration-300 md:hidden ${isMenuOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                        } ${isDark
                            ? "border-gray-800 bg-gray-950"
                            : "border-gray-200 bg-white"
                        }`}
                >
                    <div className="flex flex-col px-4 py-4 sm:px-6">

                        {/* Mobile Navigation */}
                        <div className="flex flex-col font-jetbrains">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                    className={`border-b py-3 text-sm transition ${isDark
                                        ? "border-gray-800"
                                        : "border-gray-200"
                                        }`}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Mobile Sign In / Logout */}
                        <button
                            onClick={handleSignInAndOut}
                            className="mt-4 w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            {token ? "Logout" : "Sign In/Sign Up"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Navbar Spacer */}
            <div className="h-[72px] sm:h-[78px] lg:h-[10vh]" />
        </div>
    );
}

export default AdminNavbar;