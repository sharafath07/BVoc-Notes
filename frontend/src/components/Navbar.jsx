import React, { useContext } from 'react'
import { Context } from '../Context/Context.jsx'
import { Moon, Sun } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'


function Navbar() {
    const { token, isDark, setIsDark } = useContext(Context);

    return (
        <div>
            <nav className={`flex z-99 flex-row font-roboto fixed top-0 left-0 right-0 h-[10vh] justify-around items-center  border-b-1 ${isDark ? 'dark' : 'light'}`}>
                <div>
                    <Link to='/'>
                        <h1 className='text-5xl font-caacupe'>BVOC SD</h1>
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-3 font-jetbrains'>
                    <NavLink to='/' className="nav-link">Home</NavLink>
                    <NavLink to='/about' className="nav-link">About</NavLink>
                    <NavLink to='/faculty' className="nav-link">Faculty</NavLink>
                    {token ? <NavLink to='/resources' className="nav-link">Resources</NavLink> : null}
                    <NavLink to='/contact' className="nav-link">Contact</NavLink>
                </div>

                <div className='flex flex-row items-center gap-3'>
                    <button onClick={() => setIsDark(!isDark)} className='border-1 p-1 rounded-xl'>
                        {isDark ? <Sun /> : <Moon />}
                    </button>
                    <button className='border-1 px-3 py-1 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95'>{token ? 'Logout' : 'Sign In/Sign Up'}</button>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
