import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import { Context } from "../../Context/Context";
import api from "../../api/axios";

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
        <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-6 sm:px-6 md:px-8">
            <div className="w-full max-w-md rounded-xl bg-[#3F3F41] p-5 text-center text-white shadow-xl sm:p-7 md:max-w-lg md:p-8">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-700 underline sm:text-3xl">
                        Admin Portal
                    </h1>

                    <h3 className="mt-1 text-sm opacity-60 sm:text-base">
                        B.Voc SD Space
                    </h3>
                </div>

                {/* Login Form */}
                <div className="mt-6 w-full sm:mt-7">
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col items-center justify-center"
                    >
                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="mb-4 w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:mb-5 sm:p-3 sm:text-base"
                        />

                        {/* Password */}
                        <div className="mb-4 flex w-full items-center overflow-hidden rounded border border-gray-300 bg-white sm:mb-5">
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

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="flex shrink-0 items-center justify-center px-3 py-2 text-gray-500 transition hover:text-black"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>
                        </div>

                        {/* Authenticate */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 p-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-700 active:scale-[0.98] sm:p-3 sm:text-base"
                        >
                            AUTHENTICATE
                            <ArrowRight size={19} />
                        </button>
                    </form>
                </div>

                {/* Warning */}
                <div className="mt-6 flex items-center justify-center sm:mt-7">
                    <p className="w-full max-w-sm text-xs leading-4 opacity-50">
                        Restricted Area. Unauthorized access is
                        strictly prohibited
                    </p>
                </div>

            </div>
        </div>
    );
}

export default AdminLogin;