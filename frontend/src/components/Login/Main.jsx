import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context.jsx'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../api/axios.js';


function Main() {

    const [isSignIn, setIsSignIn] = useState(true);
    const [name, setName] = useState('');
    const [registerNumber, setRegisterNumber] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [semester, setSemester] = useState('');
    const [batch, setBatch] = useState('');
    const { backendUrl, setToken, setUser, user } = useContext(Context);
    const navigate = useNavigate()

    const semesters = Array.from({ length: 8 }, (_, index) => index + 1);

    const batches = Array.from(
        { length: new Date().getFullYear() - 2025 + 1 },
        (_, index) => 2025 + index
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
            )

            if (response.data.success) {
                setToken(response.data.token)

                localStorage.setItem(
                    'token',
                    response.data.token
                )

                setUser(response.data.user);

                if (response.data.user.role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {

            console.error("Login failed:", error)

            alert(
                error.response?.data?.message || "Login Failed"
            )

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
            )

            if (response.data.success) {
                setToken(response.data.token);

                localStorage.setItem(
                    'token',
                    response.data.token
                )

                navigate('/')
            }


        } catch (error) {

            console.error("SignUp Failed: ", error);

            alert(
                error.response?.data?.message || "SignUp failed"
            )

        }
    }

    return (
        <div>
            <div className={`login-container ${isSignIn ? "right-panel-active" : ""}`} id="container">
                <div className="form-container sign-up-container">
                    <form className='login-form' action="#">
                        <h1 className='login-h1'>Create Account</h1>
                        <span className='login-span'>or use your email for registration</span>
                        <input className='login-input' type="text" placeholder="Register Number" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} required />
                        <input className='login-input' type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <select
                            className="login-input"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select Semester
                            </option>

                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    Semester {semester}
                                </option>
                            ))}
                        </select>

                        <select
                            className="login-input"
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select Batch
                            </option>

                            {batches.map((batch) => (
                                <option key={batch} value={batch}>
                                    {batch}
                                </option>
                            ))}
                        </select>
                        <input className='login-input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div className='flex items-center bg-[#eee] w-[100%] my-[5px]'>
                            <input type={`${showPassword ? "text" : "password"}`} className='login-input password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button
                                type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 py-2 h-full text-gray-400 cursor-pointer">
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        <button className='btn' onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className='login-form' action="#">
                        <h1 className='login-h1'>Sign in</h1>
                        <span className='login-span'>or use your account</span>
                        <input className='login-input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className='flex items-center bg-[#eee] w-[100%] my-[5px]'>
                            <input type={`${showPassword ? "text" : "password"}`} className='login-input password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 py-2 h-full text-gray-400 cursor-pointer">
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        <button className='btn' onClick={handleSignIn}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='login-h1'>Welcome Back!</h1>
                            <p className='login-p'>To keep connected with us please login with your personal info</p>
                            <button className="btn ghost" id="signIn" onClick={() => setIsSignIn(!isSignIn)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='login-h1'>Hello, Friend!</h1>
                            <p className='login-p'>Enter your personal details and start journey with us</p>
                            <button onClick={() => setIsSignIn(!isSignIn)} className="btn ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Main
