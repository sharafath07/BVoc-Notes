import React, { useContext } from "react";
import image from "../assets/BackgroundImage.jpg";
import {
    Building2,
    GraduationCap,
    Code2,
    Target,
    Rocket,
} from "lucide-react";
import { motion } from "motion/react";
import { Context } from "../Context/Context";
import {
    cardVariants,
    containerVariants,
} from "../animations";

function About() {
    const { isDark } = useContext(Context);

    return (
        <section
            id="about"
            className={`w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-white text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* =========================
                    HEADER
                ========================= */}

                <motion.div
                    className="mb-12 max-w-3xl sm:mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.p
                        variants={cardVariants}
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:mb-3 sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        About Us
                    </motion.p>

                    <motion.h2
                        variants={cardVariants}
                        className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        B.Voc Software Development
                    </motion.h2>

                    <motion.p
                        variants={cardVariants}
                        className={`mt-4 text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8 ${isDark
                            ? "text-gray-300"
                            : "text-gray-600"
                            }`}
                    >
                        A career-focused undergraduate programme designed to
                        develop strong technical knowledge, practical skills,
                        and professional capabilities in Computer Science and
                        Software Development.
                    </motion.p>
                </motion.div>


                {/* =========================
                    FAROOK COLLEGE
                ========================= */}

                <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">

                    {/* Image */}
                    <motion.div
                        className="w-full overflow-hidden rounded-2xl sm:rounded-3xl"
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                    >
                        <motion.img
                            src={image}
                            alt="Farook College"
                            className="h-[280px] w-full object-cover sm:h-[350px] md:h-[420px] lg:h-[500px]"
                            whileHover={{ scale: 1.04 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                        />
                    </motion.div>


                    {/* Text */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.1,
                        }}
                    >

                        <motion.div
                            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                ? "bg-white text-black"
                                : "bg-gray-900 text-white"
                                }`}
                            whileHover={{
                                scale: 1.08,
                                rotate: 3,
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <Building2 size={22} />
                        </motion.div>

                        <h3
                            className={`text-2xl font-bold sm:text-3xl ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            About Farook College
                        </h3>

                        <p
                            className={`mt-4 text-sm leading-7 sm:mt-5 sm:text-base ${isDark
                                ? "text-gray-300"
                                : "text-gray-600"
                                }`}
                        >
                            Farook College, founded with the vision of
                            uplifting the educationally disadvantaged
                            community of Malabar, has grown into one of the
                            renowned educational institutions in the region.
                        </p>

                        <p
                            className={`mt-4 text-sm leading-7 sm:text-base ${isDark
                                ? "text-gray-300"
                                : "text-gray-600"
                                }`}
                        >
                            The college is committed to providing quality
                            education across undergraduate, postgraduate, and
                            research programmes while encouraging academic
                            excellence, research, social outreach, and
                            community empowerment.
                        </p>

                        <p
                            className={`mt-4 text-sm leading-7 sm:text-base ${isDark
                                ? "text-gray-300"
                                : "text-gray-600"
                                }`}
                        >
                            Farook College became autonomous in 2015 and
                            continues to provide students with an environment
                            that supports academic growth and personal
                            development.
                        </p>
                    </motion.div>
                </div>


                {/* =========================
                    B.VOC SECTION
                ========================= */}

                <motion.div
                    className={`mt-16 rounded-2xl p-5 transition-colors duration-300 sm:mt-20 sm:rounded-3xl sm:p-8 md:mt-24 md:p-12 ${isDark
                        ? "bg-gray-900"
                        : "bg-gray-100"
                        }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                >
                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Description */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.div
                                variants={cardVariants}
                                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                    }`}
                                whileHover={{
                                    scale: 1.08,
                                    rotate: -3,
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <GraduationCap size={22} />
                            </motion.div>

                            <motion.h3
                                variants={cardVariants}
                                className={`text-2xl font-bold sm:text-3xl ${isDark
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}
                            >
                                B.Voc in Software Development
                            </motion.h3>

                            <motion.p
                                variants={cardVariants}
                                className={`mt-4 text-sm leading-7 sm:mt-5 sm:text-base ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                    }`}
                            >
                                The Department of Vocational Studies
                                (Software Development) offers the Bachelor of
                                Vocation in Software Development, a four-year
                                undergraduate programme focused on both
                                theoretical knowledge and practical training.
                            </motion.p>

                            <motion.p
                                variants={cardVariants}
                                className={`mt-4 text-sm leading-7 sm:text-base ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                    }`}
                            >
                                The programme is designed to improve the
                                skills of students by combining academic
                                learning with hands-on experience. It prepares
                                students with the knowledge and practical
                                abilities required in Computer Science and
                                Software Development.
                            </motion.p>
                        </motion.div>


                        {/* Feature Cards */}
                        <motion.div
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                        >

                            {/* Software Development */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    scale: 1.01,
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Code2
                                        size={24}
                                        className={`mb-3 sm:mb-4 ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    />
                                </motion.div>

                                <h4
                                    className={`font-semibold ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    Software Development
                                </h4>

                                <p
                                    className={`mt-2 text-sm leading-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Build practical skills in programming,
                                    software development, and modern computing
                                    technologies.
                                </p>
                            </motion.div>


                            {/* Practical Learning */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    scale: 1.01,
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Rocket
                                        size={24}
                                        className={`mb-3 sm:mb-4 ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    />
                                </motion.div>

                                <h4
                                    className={`font-semibold ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    Practical Learning
                                </h4>

                                <p
                                    className={`mt-2 text-sm leading-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Gain hands-on experience alongside
                                    theoretical understanding.
                                </p>
                            </motion.div>


                            {/* Career Focused */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    scale: 1.01,
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Target
                                        size={24}
                                        className={`mb-3 sm:mb-4 ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    />
                                </motion.div>

                                <h4
                                    className={`font-semibold ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    Career Focused
                                </h4>

                                <p
                                    className={`mt-2 text-sm leading-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Develop skills that prepare students for
                                    careers in the software and technology
                                    industry.
                                </p>
                            </motion.div>


                            {/* Skill Development */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    scale: 1.01,
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 3,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <GraduationCap
                                        size={24}
                                        className={`mb-3 sm:mb-4 ${isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    />
                                </motion.div>

                                <h4
                                    className={`font-semibold ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    Skill Development
                                </h4>

                                <p
                                    className={`mt-2 text-sm leading-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Strengthen technical knowledge and
                                    professional capabilities through
                                    vocational education.
                                </p>
                            </motion.div>

                        </motion.div>
                    </div>
                </motion.div>


                {/* =========================
                    VISION & MISSION
                ========================= */}

                <motion.div
                    className="mt-16 grid gap-5 sm:mt-20 sm:gap-6 md:grid-cols-2 lg:mt-24"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >

                    {/* Vision */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                        }}
                        transition={{ duration: 0.25 }}
                        className={`rounded-2xl border p-6 transition-colors duration-300 sm:rounded-3xl sm:p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white"
                            }`}
                    >
                        <span
                            className={`text-xs font-semibold uppercase tracking-widest sm:text-sm ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Our Vision
                        </span>

                        <h3
                            className={`mt-3 text-xl font-bold sm:mt-4 sm:text-2xl ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Preparing students for the future
                        </h3>

                        <p
                            className={`mt-3 text-sm leading-7 sm:mt-4 sm:text-base ${isDark
                                ? "text-gray-300"
                                : "text-gray-600"
                                }`}
                        >
                            To mould competent and well-developed persons who
                            can take up the challenges of the future on behalf
                            of the community, society, nation, and the world.
                        </p>
                    </motion.div>


                    {/* Mission */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                        }}
                        transition={{ duration: 0.25 }}
                        className={`rounded-2xl p-6 transition-colors duration-300 sm:rounded-3xl sm:p-8 md:p-10 ${isDark
                            ? "bg-white text-gray-900"
                            : "bg-black text-white"
                            }`}
                    >
                        <span
                            className={`text-xs font-semibold uppercase tracking-widest sm:text-sm ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Our Mission
                        </span>

                        <h3 className="mt-3 text-xl font-bold sm:mt-4 sm:text-2xl">
                            Education with purpose
                        </h3>

                        <p
                            className={`mt-3 text-sm leading-7 sm:mt-4 sm:text-base ${isDark
                                ? "text-gray-600"
                                : "text-gray-300"
                                }`}
                        >
                            To provide all-round development and training,
                            promote value-based education, empower students
                            with positive qualities and qualifications,
                            encourage research and social outreach, and ensure
                            excellence in education and related activities.
                        </p>
                    </motion.div>

                </motion.div>

            </div>
        </section>
    );
}

export default About;