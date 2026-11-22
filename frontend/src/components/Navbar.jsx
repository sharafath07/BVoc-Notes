import { useContext, useEffect, useRef, useState } from "react";
import { CodeXml, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
import api from "../api/axios";

const publicLinks = [
    ["Home", "/"], ["About", "/about"], ["Faculty", "/faculty"],
    ["Resources", "/resources"], ["Community", "/chat"], ["Contact", "/contact"],
];
const staffLinks = [
    ["Overview", "/admin/dashboard"], ["Students", "/admin/dashboard/students"],
    ["Faculty", "/admin/dashboard/faculties"], ["Subjects", "/admin/dashboard/subjects"],
    ["Resources", "/admin/dashboard/resources"], ["Community", "/chat"],
];

export default function Navbar({ staff = false }) {
    const { token, user, isDark, setIsDark, setToken, setUser, backendUrl } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [error, setError] = useState("");
    const menuToggle = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(false);
        setError("");
    }, [location.pathname]);

    async function signOut() {
        setSigningOut(true);
        setError("");
        try {
            await api.post(`${backendUrl}/api/auth/logout`);
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
            setOpen(false);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Could not sign out. Try again.");
        } finally {
            setSigningOut(false);
        }
    }

    return (
        <header className="department-header" onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            if (open) {
                setOpen(false);
                menuToggle.current?.focus();
            }
        }}>
            <div className="department-nav department-container">
                <Link to="/" className="department-brand" onClick={() => setOpen(false)}>
                    <span className="department-mark"><CodeXml aria-hidden="true" size={22} /></span>
                    <span>
                        <strong>{staff ? "Staff workspace" : "Software Development"}</strong>
                        <small>Farook College (Autonomous)</small>
                    </span>
                </Link>
                <button ref={menuToggle} type="button" className="department-icon department-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="department-navigation" onClick={() => setOpen((current) => !current)}>
                    {open ? <X size={21} /> : <Menu size={21} />}
                </button>
                <div id="department-navigation" className={`department-navigation ${open ? "is-open" : ""}`}>
                    <nav aria-label={staff ? "Staff navigation" : "Main navigation"}>
                        {(staff ? staffLinks : publicLinks).filter(([, path]) => path !== "/chat" || (token && user)).map(([label, path]) => (
                            <NavLink key={path} to={path} end={path === "/" || path === "/admin/dashboard"} onClick={() => setOpen(false)}>{label}</NavLink>
                        ))}
                    </nav>
                    <div className="department-nav-actions">
                        {!staff && ["ADMIN", "TEACHER"].includes(user?.role) && (
                            <Link to="/admin/dashboard" className="department-staff-link" onClick={() => setOpen(false)}>Staff workspace</Link>
                        )}
                        <button type="button" className="department-icon" aria-label={isDark ? "Use light theme" : "Use dark theme"} onClick={() => setIsDark(!isDark)}>
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        {token ? (
                            <button type="button" className="department-button" onClick={signOut} disabled={signingOut}>{signingOut ? "Signing out…" : "Sign out"}</button>
                        ) : (
                            <Link to={staff ? "/admin/login" : "/login"} className="department-button" onClick={() => setOpen(false)}>Sign in</Link>
                        )}
                    </div>
                    {error && <p className="department-nav-error" role="alert">{error}</p>}
                </div>
            </div>
        </header>
    );
}
