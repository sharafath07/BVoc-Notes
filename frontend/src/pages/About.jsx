import React, { useContext } from "react";
import image from "../assets/BackgroundImage.jpg";
import {
    Building2,
    GraduationCap,
    Code2,
    Target,
    Rocket,
} from "lucide-react";
import { Context } from "../Context/Context";

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

                <div className="mb-12 max-w-3xl sm:mb-16">
                    <p
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:mb-3 sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        About Us
                    </p>

                    <h2
                        className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        B.Voc Software Development
                    </h2>

                    <p
                        className={`mt-4 text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8 ${isDark
                            ? "text-gray-300"
                            : "text-gray-600"
                            }`}
                    >
                        A career-focused undergraduate programme designed to
                        develop strong technical knowledge, practical skills,
                        and professional capabilities in Computer Science and
                        Software Development.
                    </p>
                </div>


                {/* =========================
                    FAROOK COLLEGE
                ========================= */}

                <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">

                    {/* Image */}
                    <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                        <img
                            src={image}
                            alt="Farook College"
                            className="h-[280px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[350px] md:h-[420px] lg:h-[500px]"
                        />
                    </div>


                    {/* Text */}
                    <div className="w-full">

                        <div
                            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                ? "bg-white text-black"
                                : "bg-gray-900 text-white"
                                }`}
                        >
                            <Building2 size={22} />
                        </div>

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
                    </div>
                </div>


                {/* =========================
                    B.VOC SECTION
                ========================= */}

                <div
                    className={`mt-16 rounded-2xl p-5 transition-colors duration-300 sm:mt-20 sm:rounded-3xl sm:p-8 md:mt-24 md:p-12 ${isDark
                        ? "bg-gray-900"
                        : "bg-gray-100"
                        }`}
                >
                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Description */}
                        <div>
                            <div
                                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                    }`}
                            >
                                <GraduationCap size={22} />
                            </div>

                            <h3
                                className={`text-2xl font-bold sm:text-3xl ${isDark
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}
                            >
                                B.Voc in Software Development
                            </h3>

                            <p
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
                            </p>

                            <p
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
                            </p>
                        </div>


                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Software Development */}
                            <div
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <Code2
                                    size={24}
                                    className={`mb-3 sm:mb-4 ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                />

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
                            </div>


                            {/* Practical Learning */}
                            <div
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <Rocket
                                    size={24}
                                    className={`mb-3 sm:mb-4 ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                />

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
                            </div>


                            {/* Career Focused */}
                            <div
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <Target
                                    size={24}
                                    className={`mb-3 sm:mb-4 ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                />

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
                            </div>


                            {/* Skill Development */}
                            <div
                                className={`rounded-2xl p-5 shadow-sm transition-colors duration-300 sm:p-6 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <GraduationCap
                                    size={24}
                                    className={`mb-3 sm:mb-4 ${isDark
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                />

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
                            </div>

                        </div>
                    </div>
                </div>


                {/* =========================
                    VISION & MISSION
                ========================= */}

                <div className="mt-16 grid gap-5 sm:mt-20 sm:gap-6 md:grid-cols-2 lg:mt-24">

                    {/* Vision */}
                    <div
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
                    </div>


                    {/* Mission */}
                    <div
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
                    </div>

                </div>

            </div>
        </section>
    );
}

export default About;