import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context.jsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../../api/axios.js';

function Main() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [name, setName] = useState('');
    const [registerNumber, setRegisterNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [semester, setSemester] = useState('');
    const [batch, setBatch] = useState('');

    const { backendUrl, setToken, setUser } = useContext(Context);
    const navigate = useNavigate();

    const semesters = Array.from(
        { length: 8 },
        (_, index) => index + 1
    );

    const batches = Array.from(
        { length: new Date().getFullYear() - 2020 + 1 },
        (_, index) => 2020 + index
    );

    async function handleSignIn(e) {
        e.preventDefault();

        try {
            const response = await api.post(
                `${backendUrl}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            if (response.data.success) {
                setToken(response.data.token);

                localStorage.setItem(
                    'token',
                    response.data.token
                );

                setUser(response.data.user);

                if (response.data.user.role === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);

            alert(
                error.response?.data?.message ||
                'Login Failed'
            );
        }
    }

    async function handleSignUp(e) {
        e.preventDefault();

        try {
            const response = await api.post(
                `${backendUrl}/api/auth/register/student`,
                {
                    name,
                    email,
                    password,
                    registerNumber,
                    semester: Number(semester),
                    batch: String(batch)
                }
            );

            if (response.data.success) {
                setToken(response.data.token);

                localStorage.setItem(
                    'token',
                    response.data.token
                );

                setUser(response.data.user);

                navigate('/');
            }
        } catch (error) {
            console.error('SignUp Failed:', error);

            alert(
                error.response?.data?.message ||
                'SignUp failed'
            );
        }
    }

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    // =========================
    // Motion variants
    // =========================

    const formContentVariants = {
        hidden: {
            opacity: 0,
            y: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
                staggerChildren: 0.06
            }
        }
    };

    const formItemVariants = {
        hidden: {
            opacity: 0,
            y: 10
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut'
            }
        }
    };

    const overlayVariants = {
        hidden: {
            opacity: 0,
            y: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
                staggerChildren: 0.08
            }
        }
    };

    return (
        <div className="login-page">
            <div
                className={`my-auto login-container ${isSignIn ? 'right-panel-active' : ''
                    }`}
                id="container"
            >

                {/* =========================
                    SIGN UP
                ========================= */}

                <div className="form-container sign-up-container">
                    <form
                        className="login-form"
                        onSubmit={handleSignUp}
                    >
                        <motion.div
                            className="flex w-full flex-col items-center"
                            variants={formContentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1
                                className="login-h1"
                                variants={formItemVariants}
                            >
                                Create Account
                            </motion.h1>

                            <motion.span
                                className="login-span"
                                variants={formItemVariants}
                            >
                                or use your email for registration
                            </motion.span>

                            <motion.input
                                className="login-input"
                                type="text"
                                placeholder="Register Number"
                                value={registerNumber}
                                onChange={(e) =>
                                    setRegisterNumber(e.target.value)
                                }
                                required
                                variants={formItemVariants}
                                whileFocus={{
                                    scale: 1.01
                                }}
                            />

                            <motion.input
                                className="login-input"
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                                variants={formItemVariants}
                                whileFocus={{
                                    scale: 1.01
                                }}
                            />

                            <motion.select
                                className="login-input"
                                value={semester}
                                onChange={(e) =>
                                    setSemester(e.target.value)
                                }
                                required
                                variants={formItemVariants}
                                whileFocus={{
                                    scale: 1.01
                                }}
                            >
                                <option value="" disabled>
                                    Select Semester
                                </option>

                                {semesters.map((semester) => (
                                    <option
                                        key={semester}
                                        value={semester}
                                    >
                                        Semester {semester}
                                    </option>
                                ))}
                            </motion.select>

                            <motion.select
                                className="login-input"
                                value={batch}
                                onChange={(e) =>
                                    setBatch(e.target.value)
                                }
                                required
                                variants={formItemVariants}
                                whileFocus={{
                                    scale: 1.01
                                }}
                            >
                                <option value="" disabled>
                                    Select Batch
                                </option>

                                {batches.map((batch) => (
                                    <option
                                        key={batch}
                                        value={batch}
                                    >
                                        {batch}
                                    </option>
                                ))}
                            </motion.select>

                            <motion.input
                                className="login-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                variants={formItemVariants}
                                whileFocus={{
                                    scale: 1.01
                                }}
                            />

                            <motion.div
                                className="password-wrapper"
                                variants={formItemVariants}
                            >
                                <input
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    className="login-input password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <motion.button
                                    type="button"
                                    onClick={togglePassword}
                                    className="password-toggle"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                    whileHover={{
                                        scale: 1.08
                                    }}
                                    whileTap={{
                                        scale: 0.9
                                    }}
                                >
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.span
                                            key={
                                                showPassword
                                                    ? 'eye'
                                                    : 'eye-off'
                                            }
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                                rotate: -20
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.7,
                                                rotate: 20
                                            }}
                                            transition={{
                                                duration: 0.15
                                            }}
                                        >
                                            {showPassword ? (
                                                <Eye size={19} />
                                            ) : (
                                                <EyeOff size={19} />
                                            )}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="btn"
                                variants={formItemVariants}
                                whileHover={{
                                    scale: 1.03
                                }}
                                whileTap={{
                                    scale: 0.96
                                }}
                            >
                                Sign Up
                            </motion.button>

                            <motion.button
                                type="button"
                                className="mobile-switch"
                                onClick={() =>
                                    setIsSignIn(!isSignIn)
                                }
                                variants={formItemVariants}
                                whileTap={{
                                    scale: 0.97
                                }}
                            >
                                Already have an account?
                                <span> Sign In</span>
                            </motion.button>
                        </motion.div>
                    </form>
                </div>


                {/* =========================
                    SIGN IN
                ========================= */}

                <div className="form-container sign-in-container">
                    <form
                        className="login-form"
                        onSubmit={handleSignIn}
                    >
                        <motion.div
                            className="flex w-full flex-col items-center"
                            variants={formContentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1
                                className="login-h1"
                                variants={formItemVariants}
                            >
                                Sign in
                            </motion.h1>

                            <motion.span
                                className="login-span"
                                variants={formItemVariants}
                            >
                                or use your account
                            </motion.span>

                            <motion.input
                                className="login-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                variants={formItemVariants}
                                whileFocus={{
                                    scale: 1.01
                                }}
                            />

                            <motion.div
                                className="password-wrapper"
                                variants={formItemVariants}
                            >
                                <input
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    className="login-input password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <motion.button
                                    type="button"
                                    onClick={togglePassword}
                                    className="password-toggle"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                    whileHover={{
                                        scale: 1.08
                                    }}
                                    whileTap={{
                                        scale: 0.9
                                    }}
                                >
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.span
                                            key={
                                                showPassword
                                                    ? 'eye-signin'
                                                    : 'eye-off-signin'
                                            }
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                                rotate: -20
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.7,
                                                rotate: 20
                                            }}
                                            transition={{
                                                duration: 0.15
                                            }}
                                        >
                                            {showPassword ? (
                                                <Eye size={19} />
                                            ) : (
                                                <EyeOff size={19} />
                                            )}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="btn"
                                variants={formItemVariants}
                                whileHover={{
                                    scale: 1.03
                                }}
                                whileTap={{
                                    scale: 0.96
                                }}
                            >
                                Sign In
                            </motion.button>

                            <motion.button
                                type="button"
                                className="mobile-switch"
                                onClick={() =>
                                    setIsSignIn(!isSignIn)
                                }
                                variants={formItemVariants}
                                whileTap={{
                                    scale: 0.97
                                }}
                            >
                                Don't have an account?
                                <span> Sign Up</span>
                            </motion.button>
                        </motion.div>
                    </form>
                </div>


                {/* =========================
                    DESKTOP OVERLAY
                ========================= */}

                <div className="overlay-container">
                    <div className="overlay">

                        {/* LEFT */}

                        <div className="overlay-panel overlay-left">
                            <motion.div
                                className="flex flex-col items-center"
                                variants={overlayVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h1
                                    className="login-h1"
                                    variants={formItemVariants}
                                >
                                    Welcome Back!
                                </motion.h1>

                                <motion.p
                                    className="login-p"
                                    variants={formItemVariants}
                                >
                                    To keep connected with us please
                                    login with your personal info
                                </motion.p>

                                <motion.button
                                    type="button"
                                    className="btn ghost"
                                    onClick={() =>
                                        setIsSignIn(!isSignIn)
                                    }
                                    variants={formItemVariants}
                                    whileHover={{
                                        scale: 1.04
                                    }}
                                    whileTap={{
                                        scale: 0.96
                                    }}
                                >
                                    Sign In
                                </motion.button>
                            </motion.div>
                        </div>


                        {/* RIGHT */}

                        <div className="overlay-panel overlay-right">
                            <motion.div
                                className="flex flex-col items-center"
                                variants={overlayVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h1
                                    className="login-h1"
                                    variants={formItemVariants}
                                >
                                    Hello, Friend!
                                </motion.h1>

                                <motion.p
                                    className="login-p"
                                    variants={formItemVariants}
                                >
                                    Enter your personal details and
                                    start journey with us
                                </motion.p>

                                <motion.button
                                    type="button"
                                    onClick={() =>
                                        setIsSignIn(!isSignIn)
                                    }
                                    className="btn ghost"
                                    variants={formItemVariants}
                                    whileHover={{
                                        scale: 1.04
                                    }}
                                    whileTap={{
                                        scale: 0.96
                                    }}
                                >
                                    Sign Up
                                </motion.button>
                            </motion.div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Main;