import React, { useContext } from 'react'
import { Context } from '../../Context/Context'
import { Moon, Sun } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'


function AdminNavbar() {
    const { token, setToken, isDark, setIsDark, backendUrl } = useContext(Context);
    const navigate = useNavigate();

    function handleSignInAndOut() {
        if (token) {
            handleSignOut()
        } else {
            navigate('/login')
        }
    }

    async function handleSignOut() {
        try {
            const response = await axios.post(`${backendUrl}/api/auth/logout`, {})

            if (response.data.success) {
                localStorage.removeItem("token");
                setToken('');
            }
        } catch (error) {
            console.error("Logout failed:", error)

            alert(
                error.response?.data?.message || "Logout Failed"
            )
        }
    }

    return (
        <div>
            <nav className={`flex z-99 flex-row font-roboto fixed top-0 left-0 right-0 h-[10vh] justify-around items-center  border-b-1 ${isDark ? 'dark' : 'light'}`}>
                <div>
                    <Link to='/'>
                        <h1 className='text-5xl font-caacupe'>BVOC SD</h1>
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-3 font-jetbrains'>
                    <NavLink to='/admin/dashboard' className="nav-link">Dashboard</NavLink>
                    <NavLink to='/admin/dashboard/students' className="nav-link">Students</NavLink>
                    <NavLink to='/admin/dashboard/faculties' className="nav-link">Faculties</NavLink>
                    <NavLink to='/admin/dashboard/resources' className="nav-link">Resources</NavLink>
                </div>

                <div className='flex flex-row items-center gap-3'>
                    <button onClick={() => setIsDark(!isDark)} className='border-1 p-1 rounded-xl'>
                        {isDark ? <Sun /> : <Moon />}
                    </button>
                    <button onClick={handleSignInAndOut} className='border-1 px-3 py-1 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95'>{token ? 'Logout' : 'Sign In/Sign Up'}</button>
                </div>
            </nav>

        </div>
    )
}

export default AdminNavbar
