import React from "react";
import {
    Phone,
    Mail,
    ArrowUp,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="w-full bg-black font-roboto text-white">
            <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-12">

                    {/* Brand */}
                    <div className="sm:col-span-2 md:col-span-2">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            BVOC SD
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
                            A learning space for B.Voc Software Development
                            students to access resources, share knowledge,
                            and grow together.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <a
                                href="tel:+914952440660"
                                aria-label="Phone"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-200 hover:bg-white hover:text-black"
                            >
                                <Phone size={17} />
                            </a>

                            <a
                                href="mailto:mail@farookcollege.ac.in"
                                aria-label="Email"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-200 hover:bg-white hover:text-black"
                            >
                                <Mail size={17} />
                            </a>

                            <a
                                href="https://www.facebook.com/farookcollege.ac.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-200 hover:bg-white hover:text-black"
                            >
                                <FaFacebookF size={17} />
                            </a>

                            <a
                                href="https://www.youtube.com/channel/UCkAWXejR_NJtOBaTYm6pvqQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-200 hover:bg-white hover:text-black"
                            >
                                <FaYoutube size={18} />
                            </a>

                            <a
                                href="https://www.instagram.com/bvoc_official/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-200 hover:bg-white hover:text-black"
                            >
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>


                    {/* Navigation */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Navigation
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link
                                    to="/"
                                    className="transition hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="transition hover:text-white"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/faculty"
                                    className="transition hover:text-white"
                                >
                                    Faculty
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/resources"
                                    className="transition hover:text-white"
                                >
                                    Resources
                                </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Resources
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link
                                    to="/resources?type=notes"
                                    className="transition hover:text-white"
                                >
                                    Notes
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/resources?type=syllabus"
                                    className="transition hover:text-white"
                                >
                                    Syllabus
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/resources?type=pyq"
                                    className="transition hover:text-white"
                                >
                                    Previous Year Questions
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/discussion"
                                    className="transition hover:text-white"
                                >
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


                {/* Divider */}
                <div className="my-8 border-t border-gray-800 sm:my-10" />


                {/* Bottom */}
                <div className="flex flex-col items-center justify-between gap-5 text-center text-xs text-gray-500 sm:text-sm md:flex-row md:text-left">

                    <p>
                        © {new Date().getFullYear()} BVOC SD. All rights reserved.
                    </p>

                    <button
                        type="button"
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