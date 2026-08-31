import React, { useContext } from "react";
import { Mail, Phone, GraduationCap } from "lucide-react";
import { Context } from "../Context/Context";

function Faculty() {
    const { isDark } = useContext(Context);

    const faculty = [
        {
            name: "Mubeena V",
            designation: "Head of the Department",
            qualification: "M.Tech / MCA",
            email: "faculty@example.com",
            phone: "+91 00000 00000",
        },
        {
            name: "Umar Sabik UK",
            designation: "Assistant Professor",
            qualification: "M.Tech / MCA",
            email: "faculty@example.com",
            phone: "+91 00000 00000",
        },
        {
            name: "Fathima",
            designation: "Assistant Professor",
            qualification: "MCA / M.Sc",
            email: "faculty@example.com",
            phone: "+91 00000 00000",
        },
        {
            name: "Anas",
            designation: "Assistant Professor",
            qualification: "MCA / M.Tech",
            email: "faculty@example.com",
            phone: "+91 00000 00000",
        },
        {
            name: "Muhsin",
            designation: "Assistant Professor",
            qualification: "MCA / M.Tech",
            email: "faculty@example.com",
            phone: "+91 00000 00000",
        }
    ];

    return (
        <section
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
                        Department of Software Development
                    </p>

                    <h1
                        className={`text-4xl font-bold tracking-tight md:text-5xl ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        Our Faculty
                    </h1>

                    <p
                        className={`mx-auto mt-5 max-w-2xl text-lg leading-8 ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Meet the faculty members of the Department of
                        Software Development who guide and support students
                        throughout their academic journey.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {faculty.map((member, index) => (
                        <div
                            key={index}
                            className={`group overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-700"
                                : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div
                                className={`flex h-52 items-center justify-center ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-100"
                                    }`}
                            >
                                <div
                                    className={`flex h-28 w-28 items-center justify-center rounded-full ${isDark
                                        ? "bg-gray-700 text-gray-300"
                                        : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    <GraduationCap size={52} />
                                </div>
                            </div>

                            <div className="p-6">
                                <h2
                                    className={`text-xl font-bold ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    {member.name}
                                </h2>

                                <p
                                    className={`mt-1 text-sm font-medium ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {member.designation}
                                </p>

                                <div className="mt-5">
                                    <p
                                        className={`text-sm ${isDark
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        <span className="font-semibold">
                                            Qualification:
                                        </span>{" "}
                                        {member.qualification}
                                    </p>
                                </div>

                                <div
                                    className={`mt-5 border-t pt-5 ${isDark
                                        ? "border-gray-800"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <a
                                        href={`mailto:${member.email}`}
                                        className={`flex items-center gap-3 text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-500 hover:text-black"
                                            }`}
                                    >
                                        <Mail size={17} />
                                        <span>{member.email}</span>
                                    </a>

                                    <a
                                        href={`tel:${member.phone}`}
                                        className={`mt-3 flex items-center gap-3 text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-500 hover:text-black"
                                            }`}
                                    >
                                        <Phone size={17} />
                                        <span>{member.phone}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Faculty;