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
            className={`px-6 py-24 font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-white text-gray-900"
                }`}
        >
            <div className={`mx-auto max-w-7xl`}>

                <div className={`mb-16 max-w-3xl`}>
                    <p
                        className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        About Us
                    </p>

                    <h2
                        className={`text-4xl font-bold tracking-tight md:text-5xl ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        B.Voc Software Development
                    </h2>

                    <p
                        className={`mt-5 text-lg leading-8 ${isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        A career-focused undergraduate programme designed to
                        develop strong technical knowledge, practical skills,
                        and professional capabilities in Computer Science and
                        Software Development.
                    </p>
                </div>

                <div className={`grid items-center gap-12 lg:grid-cols-2`}>

                    <div className={`overflow-hidden rounded-3xl`}>
                        <img
                            src={image}
                            alt="Farook College"
                            className={`h-full min-h-[350px] w-full object-cover transition duration-500 hover:scale-105`}
                        />
                    </div>

                    <div>
                        <div
                            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                ? "bg-white text-black"
                                : "bg-gray-900 text-white"
                                }`}
                        >
                            <Building2 size={24} />
                        </div>

                        <h3
                            className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"
                                }`}
                        >
                            About Farook College
                        </h3>

                        <p
                            className={`mt-5 leading-7 ${isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                        >
                            Farook College, founded with the vision of
                            uplifting the educationally disadvantaged
                            community of Malabar, has grown into one of the
                            renowned educational institutions in the region.
                        </p>

                        <p
                            className={`mt-4 leading-7 ${isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                        >
                            The college is committed to providing quality
                            education across undergraduate, postgraduate, and
                            research programmes while encouraging academic
                            excellence, research, social outreach, and
                            community empowerment.
                        </p>

                        <p
                            className={`mt-4 leading-7 ${isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                        >
                            Farook College became autonomous in 2015 and
                            continues to provide students with an environment
                            that supports academic growth and personal
                            development.
                        </p>
                    </div>
                </div>

                <div
                    className={`mt-24 rounded-3xl p-8 transition-colors duration-300 md:p-12 ${isDark
                        ? "bg-gray-900"
                        : "bg-gray-100"
                        }`}
                >
                    <div className={`grid gap-10 lg:grid-cols-2`}>

                        <div>
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                    }`}
                            >
                                <GraduationCap size={24} />
                            </div>

                            <h3
                                className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                B.Voc in Software Development
                            </h3>

                            <p
                                className={`mt-5 leading-7 ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                    }`}
                            >
                                The Department of Vocational Studies (Software
                                Development) offers the Bachelor of Vocation
                                in Software Development, a four-year
                                undergraduate programme focused on both
                                theoretical knowledge and practical training.
                            </p>

                            <p
                                className={`mt-4 leading-7 ${isDark
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

                        <div className={`grid gap-4 sm:grid-cols-2`}>

                            <div
                                className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <Code2
                                    size={25}
                                    className={`mb-4 ${isDark
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

                            <div
                                className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <Rocket
                                    size={25}
                                    className={`mb-4 ${isDark
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

                            <div
                                className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <Target
                                    size={25}
                                    className={`mb-4 ${isDark
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

                            <div
                                className={`rounded-2xl p-6 shadow-sm transition-colors duration-300 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-white"
                                    }`}
                            >
                                <GraduationCap
                                    size={25}
                                    className={`mb-4 ${isDark
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

                <div className={`mt-24 grid gap-6 md:grid-cols-2`}>

                    <div
                        className={`rounded-3xl border p-8 transition-colors duration-300 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white"
                            }`}
                    >
                        <span
                            className={`text-sm font-semibold uppercase tracking-widest ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Our Vision
                        </span>

                        <h3
                            className={`mt-4 text-2xl font-bold ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Preparing students for the future
                        </h3>

                        <p
                            className={`mt-4 leading-7 ${isDark
                                ? "text-gray-300"
                                : "text-gray-600"
                                }`}
                        >
                            To mould competent and well-developed persons who
                            can take up the challenges of the future on behalf
                            of the community, society, nation, and the world.
                        </p>
                    </div>

                    <div
                        className={`rounded-3xl p-8 transition-colors duration-300 md:p-10 ${isDark
                            ? "bg-white text-gray-900"
                            : "bg-black text-white"
                            }`}
                    >
                        <span
                            className={`text-sm font-semibold uppercase tracking-widest ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Our Mission
                        </span>

                        <h3
                            className={`mt-4 text-2xl font-bold`}
                        >
                            Education with purpose
                        </h3>

                        <p
                            className={`mt-4 leading-7 ${isDark
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