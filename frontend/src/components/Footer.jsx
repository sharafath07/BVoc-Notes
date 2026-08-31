import React, { useContext } from "react";
import {
    Phone,
    Mail,
    ArrowUp,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube
} from "react-icons/fa";
import { Link } from 'react-router-dom'

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-black text-white font-roboto">
            <div className="mx-auto max-w-7xl px-6 py-12">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold">
                            BVOC SD
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                            A learning space for B.Voc Software Development students
                            to access resources, share knowledge, and grow together.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="tel:+914952440660"
                                aria-label="Phone"
                                className="rounded-full border border-gray-700 p-2 transition hover:bg-white hover:text-black"
                            >
                                <Phone size={18} />
                            </a>

                            <a
                                href="mailto:mail@farookcollege.ac.in"
                                aria-label="Email"
                                className="rounded-full border border-gray-700 p-2 transition hover:bg-white hover:text-black"
                            >
                                <Mail size={18} />
                            </a>

                            <a
                                href="https://www.facebook.com/farookcollege.ac.in"
                                aria-label="FaceBook"
                                className="rounded-full border border-gray-700 p-2 transition hover:bg-white hover:text-black"
                            >
                                <FaFacebookF size={18} />
                            </a>

                            <a
                                href="https://www.youtube.com/channel/UCkAWXejR_NJtOBaTYm6pvqQ"
                                aria-label="YouTube"
                                className="rounded-full border border-gray-700 p-2 transition hover:bg-white hover:text-black"
                            >
                                <FaYoutube size={18} />
                            </a>

                            <a
                                href="https://www.instagram.com/bvoc_official/"
                                aria-label="Instagram"
                                className="rounded-full border border-gray-700 p-2 transition hover:bg-white hover:text-black"
                            >
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-4 font-semibold">
                            Navigation
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link to="/" className="transition hover:text-white">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/about" className="transition hover:text-white">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link to="/faculty" className="transition hover:text-white">
                                    Faculty
                                </Link>
                            </li>

                            <li>
                                <Link to="/resources" className="transition hover:text-white">
                                    Resources
                                </Link>
                            </li>

                            {/* <li>
                                <Link to="/discussion" className="transition hover:text-white">
                                    Discussion
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 font-semibold">
                            Resources
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link to="/resources?type=notes" className="transition hover:text-white">
                                    Notes
                                </Link>
                            </li>

                            <li>
                                <Link to="/resources?type=syllabus" className="transition hover:text-white">
                                    Syllabus
                                </Link>
                            </li>

                            <li>
                                <Link to="/resources?type=pyq" className="transition hover:text-white">
                                    Previous Year Questions
                                </Link>
                            </li>

                            <li>
                                <Link to="/discussion" className="transition hover:text-white">
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-10 border-t border-gray-800" />

                {/* Bottom */}
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">

                    <p>
                        © {new Date().getFullYear()} BVOC SD. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 transition hover:text-white"
                    >
                        Back to top
                        <ArrowUp size={16} />
                    </button>

                </div>
            </div>
        </footer>
    );
}

export default Footer;