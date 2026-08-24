import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Context } from '../Context/Context';

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const { backendUrl, setToken } = useContext(Context)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post(
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

                navigate("/admin/dashboard")
            }

        } catch (error) {

            console.error('Login failed: ', error)

            alert(
                error.response?.data?.message || "Login failed"
            )
        }

    }

    return (
        <div className='w-[100vw] h-[100vh] bg-white m-0 text-white flex justify-center items-center'>
            <div className='w-[50vw] p-5 bg-[#3F3F41] text-center flex flex-col gap-7 items-center rounded-lg'>
                <div>
                    <h1 className='text-3xl text-blue-700 font-bolder underline'>Admin Portal</h1>
                    <h3 className='opacity-60'>B.Voc SD Space</h3>
                </div>
                <div className='bg-[#3F3F41]'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                        <input type="email" placeholder="Email" name="email" required className="p-2 w-80 mb-5 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="flex items-center w-80 border border-gray-300 rounded mb-5 overflow-hidden divide-x-1">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required className="p-2 w-full outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type="button" onClick={() => setShowPassword(!showPassword)} className="px-3 py-2 h-full text-gray-500 cursor-pointer">
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        <button type='submit' className='flex items-center justify-center border rounded p-2 gap-2 w-full hover:bg-gray-700 cursor-pointer'>
                            AUTHENTICATE <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
                <div className='flex items-center justify-center'>
                    <p className='w-[75%] text-wrap text-xs opacity-50 leading-4'>Restricted Area. Unauthorized access is strictly prohibited</p>
                </div>

            </div>
        </div>
    )
}

export default AdminLogin
