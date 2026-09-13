import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    pageVariants,
    containerVariants,
    cardVariants,
    buttonVariants,
} from "../../animations";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        backendUrl,
        setToken,
        setUser,
    } = useContext(Context);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post(
                `${backendUrl}/api/auth/login`,
                {
                    email,
                    password,
                }
            );

            if (response.data.success) {
                setToken(response.data.token);

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                setUser(response.data.user);

                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error(
                "Login failed: ",
                error
            );

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-6 sm:px-6 md:px-8"
        >
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.97,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.45,
                    delay: 0.08,
                    ease: "easeOut",
                }}
                className="w-full max-w-md rounded-xl bg-[#3F3F41] p-5 text-center text-white shadow-xl sm:p-7 md:max-w-lg md:p-8"
            >

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={cardVariants}
                        className="text-2xl font-bold text-blue-700 underline sm:text-3xl"
                    >
                        Admin Portal
                    </motion.h1>

                    <motion.h3
                        variants={cardVariants}
                        className="mt-1 text-sm opacity-60 sm:text-base"
                    >
                        B.Voc SD Space
                    </motion.h3>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: "easeOut",
                    }}
                    className="mt-6 w-full sm:mt-7"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col items-center justify-center"
                    >
                        {/* Email */}
                        <motion.input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            whileFocus={{
                                scale: 1.005,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="mb-4 w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:mb-5 sm:p-3 sm:text-base"
                        />

                        {/* Password */}
                        <motion.div
                            whileFocus={{
                                scale: 1.005,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="mb-4 flex w-full items-center overflow-hidden rounded border border-gray-300 bg-white sm:mb-5"
                        >
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                className="min-w-0 flex-1 p-2.5 text-sm text-gray-900 outline-none sm:p-3 sm:text-base"
                            />

                            <motion.button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                whileTap={{
                                    scale: 0.9,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                }}
                                className="flex shrink-0 items-center justify-center px-3 py-2 text-gray-500 transition hover:text-black"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                <AnimatePresence
                                    mode="wait"
                                    initial={false}
                                >
                                    {showPassword ? (
                                        <motion.span
                                            key="eye-off"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                                rotate: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8,
                                                rotate: 10,
                                            }}
                                            transition={{
                                                duration: 0.15,
                                            }}
                                        >
                                            <EyeOff size={19} />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="eye"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                                rotate: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.8,
                                                rotate: -10,
                                            }}
                                            transition={{
                                                duration: 0.15,
                                            }}
                                        >
                                            <Eye size={19} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>

                        {/* Authenticate */}
                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 p-2.5 text-sm font-medium transition-colors duration-200 hover:bg-gray-700 sm:p-3 sm:text-base"
                        >
                            AUTHENTICATE

                            <motion.span
                                animate={{
                                    x: [0, 3, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "easeInOut",
                                }}
                            >
                                <ArrowRight size={19} />
                            </motion.span>
                        </motion.button>
                    </form>
                </motion.div>

                {/* Warning */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 8,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.35,
                        delay: 0.35,
                    }}
                    className="mt-6 flex items-center justify-center sm:mt-7"
                >
                    <p className="w-full max-w-sm text-xs leading-4 opacity-50">
                        Restricted Area. Unauthorized access is
                        strictly prohibited
                    </p>
                </motion.div>

            </motion.div>
        </motion.div>
    );
}

export default AdminLogin;