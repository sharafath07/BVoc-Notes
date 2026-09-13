import React, { useContext, useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Send,
} from "lucide-react";
import { motion } from "motion/react";
import { Context } from "../Context/Context";
import {
    cardVariants,
    containerVariants,
    buttonVariants,
} from "../animations";

function Contact() {
    const { isDark } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log({
            name,
            email,
            message,
        });
    }

    return (
        <section
            id="contact"
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-white text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* =========================
                    HEADER
                ========================= */}

                <motion.div
                    className="mb-10 text-center sm:mb-14 md:mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.p
                        variants={cardVariants}
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:mb-3 sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Get In Touch
                    </motion.p>

                    <motion.h1
                        variants={cardVariants}
                        className={`text-3xl font-bold sm:text-4xl md:text-5xl ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        Contact Us
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mx-auto mt-4 max-w-2xl text-sm leading-7 sm:mt-5 sm:text-base md:text-lg md:leading-8 ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Have a question or need more information?
                        Feel free to get in touch with the Department
                        of Software Development.
                    </motion.p>
                </motion.div>


                {/* =========================
                    CONTACT GRID
                ========================= */}

                <div className="grid gap-6 md:gap-8 lg:grid-cols-2">

                    {/* =========================
                        CONTACT INFORMATION
                    ========================= */}

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className={`rounded-2xl border p-5 sm:rounded-3xl sm:p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white shadow-md"
                            }`}
                    >
                        <h2
                            className={`text-xl font-bold sm:text-2xl ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Contact Information
                        </h2>

                        <p
                            className={`mt-3 text-sm leading-6 sm:text-base sm:leading-7 ${isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                                }`}
                        >
                            You can reach Farook College using the
                            contact details below.
                        </p>


                        {/* Contact Details */}
                        <motion.div
                            className="mt-7 space-y-6 sm:mt-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >

                            {/* Address */}
                            <motion.div
                                variants={cardVariants}
                                className="flex items-start gap-3 sm:gap-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: -3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    <MapPin size={19} />
                                </motion.div>

                                <div className="min-w-0">
                                    <h3
                                        className={`font-semibold ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        Address
                                    </h3>

                                    <p
                                        className={`mt-1 text-sm leading-6 ${isDark
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        Farook College (Autonomous),
                                        <br />
                                        P.O Farook College,
                                        <br />
                                        PIN: 673 632,
                                        <br />
                                        Kozhikode Dist. Kerala, India
                                    </p>
                                </div>
                            </motion.div>


                            {/* Phone */}
                            <motion.div
                                variants={cardVariants}
                                className="flex items-start gap-3 sm:gap-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    <Phone size={19} />
                                </motion.div>

                                <div className="min-w-0">
                                    <h3
                                        className={`font-semibold ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        Phone
                                    </h3>

                                    <a
                                        href="tel:+914952440660"
                                        className={`mt-1 block text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-600 hover:text-black"
                                            }`}
                                    >
                                        +91 495 2440660
                                    </a>

                                    <a
                                        href="tel:+914952440661"
                                        className={`block text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-600 hover:text-black"
                                            }`}
                                    >
                                        +91 495 2440661
                                    </a>
                                </div>
                            </motion.div>


                            {/* Email */}
                            <motion.div
                                variants={cardVariants}
                                className="flex items-start gap-3 sm:gap-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: -3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    <Mail size={19} />
                                </motion.div>

                                <div className="min-w-0">
                                    <h3
                                        className={`font-semibold ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        Email
                                    </h3>

                                    <a
                                        href="mailto:mail@farookcollege.ac.in"
                                        className={`mt-1 block break-all text-sm transition sm:break-normal ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-600 hover:text-black"
                                            }`}
                                    >
                                        mail@farookcollege.ac.in
                                    </a>
                                </div>
                            </motion.div>

                        </motion.div>
                    </motion.div>


                    {/* =========================
                        MESSAGE FORM
                    ========================= */}

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.1,
                        }}
                        className={`rounded-2xl border p-5 sm:rounded-3xl sm:p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white shadow-md"
                            }`}
                    >
                        <h2
                            className={`text-xl font-bold sm:text-2xl ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Send Us a Message
                        </h2>

                        <p
                            className={`mt-3 text-sm leading-6 sm:text-base sm:leading-7 ${isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                                }`}
                        >
                            Fill out the form and we'll get back to
                            you as soon as possible.
                        </p>


                        <motion.form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-4 sm:mt-8 sm:space-y-5"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                            }}
                        >

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Name
                                </label>

                                <motion.input
                                    id="contact-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Your name"
                                    required
                                    whileFocus={{
                                        scale: 1.01,
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition sm:text-base ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                        }`}
                                />
                            </div>


                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Email
                                </label>

                                <motion.input
                                    id="contact-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="your@email.com"
                                    required
                                    whileFocus={{
                                        scale: 1.01,
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition sm:text-base ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                        }`}
                                />
                            </div>


                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Message
                                </label>

                                <motion.textarea
                                    id="contact-message"
                                    rows="6"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    placeholder="Write your message..."
                                    required
                                    whileFocus={{
                                        scale: 1.01,
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className={`w-full resize-none rounded-xl border px-4 py-3 text-sm leading-6 outline-none transition sm:text-base ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                        }`}
                                />
                            </div>


                            {/* Submit */}
                            <motion.button
                                type="submit"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 sm:text-base ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                <motion.span
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Send size={18} />
                                </motion.span>

                                Send Message
                            </motion.button>

                        </motion.form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default Contact;