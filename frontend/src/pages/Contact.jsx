import React, { useContext, useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Send,
} from "lucide-react";
import { Context } from "../Context/Context";

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
            className={`min-h-screen px-6 py-24 font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-white text-gray-900"
                }`}
        >
            <div className="mx-auto max-w-7xl">

                <div className="mb-16 text-center">
                    <p
                        className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Get In Touch
                    </p>

                    <h1
                        className={`text-4xl font-bold md:text-5xl ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        Contact Us
                    </h1>

                    <p
                        className={`mx-auto mt-5 max-w-2xl text-lg leading-8 ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Have a question or need more information?
                        Feel free to get in touch with the Department
                        of Software Development.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">

                    <div
                        className={`rounded-3xl border p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white shadow-md"
                            }`}
                    >
                        <h2
                            className={`text-2xl font-bold ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Contact Information
                        </h2>

                        <p
                            className={`mt-3 leading-7 ${isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                                }`}
                        >
                            You can reach Farook College using the
                            contact details below.
                        </p>

                        <div className="mt-8 space-y-6">

                            <div className="flex gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    <MapPin size={21} />
                                </div>

                                <div>
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
                            </div>

                            <div className="flex gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    <Phone size={21} />
                                </div>

                                <div>
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
                            </div>

                            <div className="flex gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    <Mail size={21} />
                                </div>

                                <div>
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
                                        className={`mt-1 block text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-600 hover:text-black"
                                            }`}
                                    >
                                        mail@farookcollege.ac.in
                                    </a>
                                </div>
                            </div>

                        </div>


                    </div>

                    <div
                        className={`rounded-3xl border p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white shadow-md"
                            }`}
                    >
                        <h2
                            className={`text-2xl font-bold ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Send Us a Message
                        </h2>

                        <p
                            className={`mt-3 leading-7 ${isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                                }`}
                        >
                            Fill out the form and we'll get back to
                            you as soon as possible.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Your name"
                                    required
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                        }`}
                                />
                            </div>

                            <div>
                                <label
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="your@email.com"
                                    required
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                        }`}
                                />
                            </div>

                            <div>
                                <label
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Message
                                </label>

                                <textarea
                                    rows="6"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    placeholder="Write your message..."
                                    required
                                    className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                        }`}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contact;