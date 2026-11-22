import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context.jsx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../../api/axios.js';

function Main() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [name, setName] = useState('');
    const [registerNumber, setRegisterNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [semester, setSemester] = useState('');
    const [batch, setBatch] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const { backendUrl, setToken, setUser, setIsLoading } = useContext(Context);
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
        setLoginError('');

        try {
            setIsLoading(true);
            const response = await api.post(
                `${backendUrl}/api/auth/login`,
                {
                    identifier: identifier.trim(),
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

                if (response.data.user.role === 'ADMIN' || response.data.user.role === 'TEACHER') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);

            setLoginError(
                error.response?.data?.message ||
                'Login Failed'
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSignUp(e) {
        e.preventDefault();
        setRegistrationError('');

        try {
            setIsLoading(true);
            const response = await api.post(
                `${backendUrl}/api/auth/register/student`,
                {
                    name,
                    email,
                    username: username.trim(),
                    password,
                    registerNumber,
                    semester:
                        semester === "ALUMNI"
                            ? null
                            : Number(semester),
                    batch: String(batch),
                    status:
                        semester === "ALUMNI"
                            ? "ALUMNI"
                            : "ACTIVE",
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

            setRegistrationError(
                error.response?.data?.message ||
                'SignUp failed'
            );
        } finally {
            setIsLoading(false);
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
                className={`my-auto login-container ${showSignUp ? 'right-panel-active' : ''
                    }`}
                id="container"
            >

                {/* =========================
                    SIGN UP
                ========================= */}

                <div className="form-container sign-up-container" inert={!showSignUp}>
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
                                Choose a username for your student account.
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

                            <motion.input
                                className="login-input"
                                type="text"
                                name="username"
                                aria-label="Username"
                                placeholder="Username"
                                title="Use 3–24 letters, numbers, or underscores."
                                autoComplete="username"
                                autoCapitalize="none"
                                spellCheck={false}
                                minLength={3}
                                maxLength={24}
                                pattern="[A-Za-z0-9_]{3,24}"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                variants={formItemVariants}
                            />

                            <motion.select
                                className="login-input"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
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

                                <option value="ALUMNI">
                                    Alumni
                                </option>
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

                            {registrationError && <p className="login-error" role="alert">{registrationError}</p>}
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
                                onClick={() => setShowSignUp(false)}
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

                <div className="form-container sign-in-container" inert={showSignUp}>
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
                                Use your username or email.
                            </motion.span>

                            <motion.input
                                className="login-input"
                                type="text"
                                name="identifier"
                                aria-label="Username or email"
                                placeholder="Username or email"
                                autoComplete="username"
                                autoCapitalize="none"
                                spellCheck={false}
                                maxLength={254}
                                value={identifier}
                                onChange={(e) =>
                                    setIdentifier(e.target.value)
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

                            {loginError && <p className="login-error" role="alert">{loginError}</p>}
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
                                onClick={() => setShowSignUp(true)}
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

                        <div className="overlay-panel overlay-left" inert={!showSignUp}>
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
                                    onClick={() => setShowSignUp(false)}
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

                        <div className="overlay-panel overlay-right" inert={showSignUp}>
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
                                    onClick={() => setShowSignUp(true)}
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
