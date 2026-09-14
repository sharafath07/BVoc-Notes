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
import { motion } from "motion/react";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const footerContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const footerItemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const socialVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        },
    };

    return (
        <footer className="w-full bg-black font-roboto text-white">
            <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">

                {/* Main Footer */}

                <motion.div
                    className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-12"
                    variants={footerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                >

                    {/* Brand */}

                    <motion.div
                        className="sm:col-span-2 md:col-span-2"
                        variants={footerItemVariants}
                    >
                        <motion.h2
                            className="text-2xl font-bold sm:text-3xl"
                            variants={footerItemVariants}
                        >
                            BVOC SD
                        </motion.h2>

                        <motion.p
                            className="mt-4 max-w-md text-sm leading-6 text-gray-400"
                            variants={footerItemVariants}
                        >
                            A learning space for B.Voc Software Development
                            students to access resources, share knowledge,
                            and grow together.
                        </motion.p>


                        {/* Social Links */}

                        <motion.div
                            className="mt-6 flex flex-wrap items-center gap-3"
                            variants={footerContainerVariants}
                        >
                            <motion.a
                                href="tel:+914952440660"
                                aria-label="Phone"
                                variants={socialVariants}
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.92,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-colors duration-200 hover:bg-white hover:text-black"
                            >
                                <Phone size={17} />
                            </motion.a>

                            <motion.a
                                href="mailto:mail@farookcollege.ac.in"
                                aria-label="Email"
                                variants={socialVariants}
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.92,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-colors duration-200 hover:bg-white hover:text-black"
                            >
                                <Mail size={17} />
                            </motion.a>

                            <motion.a
                                href="https://www.facebook.com/farookcollege.ac.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                variants={socialVariants}
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.92,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-colors duration-200 hover:bg-white hover:text-black"
                            >
                                <FaFacebookF size={17} />
                            </motion.a>

                            <motion.a
                                href="https://www.youtube.com/channel/UCkAWXejR_NJtOBaTYm6pvqQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                variants={socialVariants}
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.92,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-colors duration-200 hover:bg-white hover:text-black"
                            >
                                <FaYoutube size={18} />
                            </motion.a>

                            <motion.a
                                href="https://www.instagram.com/bvoc_official/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                variants={socialVariants}
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.92,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-colors duration-200 hover:bg-white hover:text-black"
                            >
                                <FaInstagram size={18} />
                            </motion.a>
                        </motion.div>
                    </motion.div>


                    {/* Navigation */}

                    <motion.div variants={footerItemVariants}>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Navigation
                        </h3>

                        <motion.ul
                            className="space-y-3 text-sm text-gray-400"
                            variants={footerContainerVariants}
                        >
                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Home
                                    </motion.span>
                                </Link>
                            </motion.li>

                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/about"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        About
                                    </motion.span>
                                </Link>
                            </motion.li>

                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/faculty"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Faculty
                                    </motion.span>
                                </Link>
                            </motion.li>

                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/resources"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Resources
                                    </motion.span>
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </motion.div>


                    {/* Resources */}

                    <motion.div variants={footerItemVariants}>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Resources
                        </h3>

                        <motion.ul
                            className="space-y-3 text-sm text-gray-400"
                            variants={footerContainerVariants}
                        >
                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/resources?type=notes"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Notes
                                    </motion.span>
                                </Link>
                            </motion.li>

                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/resources?type=syllabus"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Syllabus
                                    </motion.span>
                                </Link>
                            </motion.li>

                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/resources?type=pyq"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Previous Year Questions
                                    </motion.span>
                                </Link>
                            </motion.li>

                            <motion.li variants={footerItemVariants}>
                                <Link
                                    to="/"
                                    className="transition-colors duration-200 hover:text-white"
                                >
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                    >
                                        Community
                                    </motion.span>
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </motion.div>


                {/* Divider */}

                <motion.div
                    className="my-8 border-t border-gray-800 sm:my-10"
                    initial={{
                        opacity: 0,
                        scaleX: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        scaleX: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                />


                {/* Bottom */}

                <motion.div
                    className="flex flex-col items-center justify-between gap-5 text-center text-xs text-gray-500 sm:text-sm md:flex-row md:text-left"
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                >
                    <p>
                        © {new Date().getFullYear()} BVOC SD. All rights reserved.
                    </p>

                    <motion.button
                        type="button"
                        onClick={scrollToTop}
                        whileHover={{
                            y: -3,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                    >
                        Back to top

                        <motion.span
                            animate={{
                                y: [0, -3, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        >
                            <ArrowUp size={16} />
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;