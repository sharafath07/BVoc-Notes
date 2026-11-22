import { CodeXml } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

export default function Footer() {
    const { token, user } = useContext(Context);
    return (
        <footer className="department-footer">
            <div className="department-container">
                <div className="department-footer-grid">
                    <div>
                        <Link to="/" className="department-brand">
                            <span className="department-mark"><CodeXml aria-hidden="true" size={21} /></span>
                            <span><strong>Software Development</strong><small>Farook College (Autonomous)</small></span>
                        </Link>
                        <address>Farook College P.O., Kozhikode, Kerala 673 632</address>
                    </div>
                    <div>
                        <h2>Department</h2>
                        <Link to="/about">About the programme</Link>
                        <Link to="/faculty">Faculty</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div>
                        <h2>Portal</h2>
                        <Link to="/resources">Academic resources</Link>
                        {token && user && <Link to="/chat">Community chat</Link>}
                        <Link to="/admin/login">Staff access</Link>
                    </div>
                </div>
                <div className="department-footer-bottom">
                    <span>© {new Date().getFullYear()} Department of Software Development</span>
                    <a href="https://sharafath-two.vercel.app/" target="_blank" rel="noreferrer">Website by Sharafath V.</a>
                </div>
            </div>
        </footer>
    );
}
