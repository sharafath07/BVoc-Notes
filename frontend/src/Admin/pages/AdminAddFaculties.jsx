import React, { useContext, useState } from "react";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    pageVariants,
    containerVariants,
    cardVariants,
    buttonVariants,
    fadeVariants,
} from "../../animations";

function AdminAddFaculties() {
    const { isDark, backendUrl } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                `${backendUrl}/api/teachers`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword:
                        formData.confirmPassword,
                }
            );

            setSuccess(
                response.data?.message ||
                "Teacher registered successfully"
            );

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // Navigate back to faculty list after success
            setTimeout(() => {
                navigate("/admin/dashboard/faculties");
            }, 1000);
        } catch (error) {
            console.error(
                "Teacher registration error:",
                error
            );

            const responseData = error.response?.data;

            if (
                responseData?.errors &&
                typeof responseData.errors === "object"
            ) {
                const firstError = Object.values(
                    responseData.errors
                ).flat()?.[0];

                setError(
                    firstError ||
                    responseData.message ||
                    "Failed to register teacher"
                );
            } else {
                setError(
                    responseData?.message ||
                    "Failed to register teacher"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className={`min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mx-auto w-full max-w-3xl"
            >
                {/* Back Button */}
                <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() =>
                        navigate("/admin/dashboard/faculties")
                    }
                    className={`mb-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isDark
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                        }`}
                >
                    <ArrowLeft size={18} />
                    Back to Faculty
                </motion.button>

                {/* Header */}
                <motion.div
                    variants={fadeVariants}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                                }`}
                        >
                            <UserPlus size={24} />
                        </div>

                        <div>
                            <h1
                                className={`text-2xl font-bold sm:text-3xl ${isDark
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}
                            >
                                Register Faculty
                            </h1>

                            <p
                                className={`mt-1 text-sm ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                Create a new faculty teacher
                                account
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    variants={cardVariants}
                    className={`rounded-2xl border p-5 shadow-sm sm:p-8 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                        }`}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-200"
                                    : "text-gray-700"
                                    }`}
                            >
                                Full Name
                            </label>

                            <div className="relative">
                                <User
                                    size={19}
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter faculty name"
                                    autoComplete="name"
                                    disabled={loading}
                                    className={`w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-blue-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-200"
                                    : "text-gray-700"
                                    }`}
                            >
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={19}
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter faculty email"
                                    autoComplete="email"
                                    disabled={loading}
                                    className={`w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-blue-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-200"
                                    : "text-gray-700"
                                    }`}
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={19}
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        formData.password
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    className={`w-full rounded-lg border py-3 pl-10 pr-12 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-blue-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                                        }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500 hover:text-gray-300"
                                        : "text-gray-400 hover:text-gray-600"
                                        }`}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>

                            <p
                                className={`mt-2 text-xs ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Password must be at least 8
                                characters.
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-200"
                                    : "text-gray-700"
                                    }`}
                            >
                                Confirm Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={19}
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    className={`w-full rounded-lg border py-3 pl-10 pr-12 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-blue-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                                        }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500 hover:text-gray-300"
                                        : "text-gray-400 hover:text-gray-600"
                                        }`}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -5,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className={`rounded-lg border px-4 py-3 text-sm ${isDark
                                    ? "border-red-900/50 bg-red-950/30 text-red-400"
                                    : "border-red-200 bg-red-50 text-red-600"
                                    }`}
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Success */}
                        {success && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -5,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className={`rounded-lg border px-4 py-3 text-sm ${isDark
                                    ? "border-green-900/50 bg-green-950/30 text-green-400"
                                    : "border-green-200 bg-green-50 text-green-600"
                                    }`}
                            >
                                {success}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/admin/dashboard/faculties"
                                    )
                                }
                                disabled={loading}
                                className={`rounded-lg px-5 py-3 text-sm font-medium transition ${isDark
                                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <UserPlus size={18} />

                                {loading
                                    ? "Registering..."
                                    : "Register Faculty"}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default AdminAddFaculties;