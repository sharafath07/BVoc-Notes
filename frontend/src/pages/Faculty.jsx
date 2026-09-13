import React, { useContext } from "react";
import { Mail, Phone, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { Context } from "../Context/Context";
import {
    cardVariants,
    containerVariants,
} from "../animations";

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
        },
    ];

    return (
        <section
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-white text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
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
                        Department of Software Development
                    </motion.p>

                    <motion.h1
                        variants={cardVariants}
                        className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        Our Faculty
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mx-auto mt-4 max-w-2xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 md:text-lg ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Meet the faculty members of the Department of
                        Software Development who guide and support students
                        throughout their academic journey.
                    </motion.p>
                </motion.div>


                {/* Faculty Grid */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {faculty.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -6,
                                scale: 1.01,
                            }}
                            whileTap={{ scale: 0.99 }}
                            transition={{
                                duration: 0.25,
                                ease: "easeOut",
                            }}
                            className={`group overflow-hidden rounded-2xl border sm:rounded-3xl ${isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-700"
                                : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            {/* Faculty Image / Icon */}
                            <div
                                className={`flex h-44 items-center justify-center sm:h-48 md:h-52 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-100"
                                    }`}
                            >
                                <motion.div
                                    className={`flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28 ${isDark
                                        ? "bg-gray-700 text-gray-300"
                                        : "bg-gray-200 text-gray-500"
                                        }`}
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeOut",
                                    }}
                                >
                                    <GraduationCap
                                        size={44}
                                        className="sm:h-[52px] sm:w-[52px]"
                                    />
                                </motion.div>
                            </div>

                            {/* Faculty Details */}
                            <div className="p-5 sm:p-6">
                                <h2
                                    className={`text-lg font-bold sm:text-xl ${isDark
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

                                {/* Qualification */}
                                <motion.div
                                    className="mt-4 sm:mt-5"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.1,
                                    }}
                                >
                                    <p
                                        className={`text-sm leading-6 ${isDark
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        <span className="font-semibold">
                                            Qualification:
                                        </span>{" "}
                                        {member.qualification}
                                    </p>
                                </motion.div>

                                {/* Contact */}
                                <div
                                    className={`mt-5 border-t pt-5 ${isDark
                                        ? "border-gray-800"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <motion.a
                                        href={`mailto:${member.email}`}
                                        whileHover={{ x: 3 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex min-w-0 items-center gap-3 text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-500 hover:text-black"
                                            }`}
                                    >
                                        <Mail
                                            size={17}
                                            className="shrink-0"
                                        />

                                        <span className="min-w-0 break-all sm:break-normal">
                                            {member.email}
                                        </span>
                                    </motion.a>

                                    <motion.a
                                        href={`tel:${member.phone}`}
                                        whileHover={{ x: 3 }}
                                        transition={{ duration: 0.2 }}
                                        className={`mt-3 flex items-center gap-3 text-sm transition ${isDark
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-500 hover:text-black"
                                            }`}
                                    >
                                        <Phone
                                            size={17}
                                            className="shrink-0"
                                        />

                                        <span>{member.phone}</span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default Faculty;