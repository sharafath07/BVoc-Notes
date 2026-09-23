import React, { useContext, useEffect, useMemo } from "react";
import {
    Users,
    GraduationCap,
    BookOpen,
    FileText,
    ClipboardList,
    ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import {
    pageVariants,
    containerVariants,
    cardVariants,
    buttonVariants,
} from "../../animations";

function AdminDashboard() {
    const {
        isDark,
        students,
        faculty,
        user,
        resources,
    } = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        if (user.role !== "ADMIN" && user.role !== "TEACHER") {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    const resourceCounts = useMemo(() => {
        return {
            NOTES:
                resources?.filter(
                    (resource) => resource.type === "NOTES"
                ).length || 0,

            SYLLABUS:
                resources?.filter(
                    (resource) => resource.type === "SYLLABUS"
                ).length || 0,

            PYQ:
                resources?.filter(
                    (resource) => resource.type === "PYQ"
                ).length || 0,
        };
    }, [resources]);

    const statistics = [
        {
            title: "Students",
            count: students?.length || 0,
            description: "Registered students",
            icon: GraduationCap,
            path: "/admin/dashboard/students",
        },
        {
            title: "Faculty",
            count: faculty?.length || 0,
            description: "Faculty members",
            icon: Users,
            path: "/admin/dashboard/faculties",
        },
        {
            title: "Resources",
            count: resources?.length || 0,
            description: "Total resources",
            icon: BookOpen,
            path: "/admin/dashboard/resources",
        },
    ];

    const resourceTypes = [
        {
            title: "Notes",
            count: resourceCounts.NOTES,
            description: "Study notes and materials",
            icon: BookOpen,
            path: "/admin/dashboard/resources",
        },
        {
            title: "Syllabus",
            count: resourceCounts.SYLLABUS,
            description: "Subject syllabus",
            icon: FileText,
            path: "/admin/dashboard/resources",
        },
        {
            title: "Previous Year Questions",
            count: resourceCounts.PYQ,
            description: "Previous year question papers",
            icon: ClipboardList,
            path: "/admin/dashboard/resources",
        },
    ];

    return (
        <motion.section
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8 sm:mb-10"
                >
                    <motion.p
                        variants={cardVariants}
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Administration
                    </motion.p>

                    <motion.h1
                        variants={cardVariants}
                        className="text-3xl font-bold sm:text-4xl md:text-5xl"
                    >
                        Dashboard
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mt-2 text-sm sm:mt-3 sm:text-base ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        Overview of your BVOC SD platform.
                    </motion.p>
                </motion.div>

                {/* Main Statistics */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:mb-12 lg:grid-cols-3"
                >
                    {statistics.map((item) => {
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.title}
                                type="button"
                                variants={cardVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => navigate(item.path)}
                                className={`group w-full rounded-2xl border p-5 text-left transition-colors duration-300 sm:p-6 ${isDark
                                    ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                    : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">

                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${isDark
                                            ? "bg-white text-black"
                                            : "bg-black text-white"
                                            }`}
                                    >
                                        <Icon
                                            size={22}
                                            className="sm:h-6 sm:w-6"
                                        />
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                    >
                                        <ArrowRight
                                            size={20}
                                            className={`shrink-0 ${isDark
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                                }`}
                                        />
                                    </motion.div>
                                </div>

                                <p
                                    className={`mt-5 text-sm sm:mt-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </p>

                                <motion.h2
                                    key={item.count}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                    className="mt-1 text-3xl font-bold sm:text-4xl"
                                >
                                    {item.count}
                                </motion.h2>

                                <p
                                    className={`mt-2 text-sm ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {item.description}
                                </p>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Resources */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl">
                                Resources
                            </h2>

                            <p
                                className={`mt-1 text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Resource breakdown by type
                            </p>
                        </div>

                        <motion.button
                            type="button"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() =>
                                navigate(
                                    "/admin/dashboard/resources"
                                )
                            }
                            className={`self-start text-sm font-medium transition hover:underline sm:self-auto ${isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            View all
                        </motion.button>
                    </div>

                    {/* Resource Type Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
                    >
                        {resourceTypes.map((item) => {
                            const Icon = item.icon;

                            return (
                                <motion.button
                                    key={item.title}
                                    type="button"
                                    variants={cardVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() =>
                                        navigate(item.path)
                                    }
                                    className={`group w-full rounded-2xl border p-5 text-left transition-colors duration-300 sm:p-6 ${isDark
                                        ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                        : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-4">

                                        <motion.div
                                            whileHover={{
                                                scale: 1.04,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${isDark
                                                ? "bg-gray-800 text-white"
                                                : "bg-gray-100 text-black"
                                                }`}
                                        >
                                            <Icon
                                                size={21}
                                                className="sm:h-[22px] sm:w-[22px]"
                                            />
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            <ArrowRight
                                                size={19}
                                                className={`shrink-0 ${isDark
                                                    ? "text-gray-600"
                                                    : "text-gray-400"
                                                    }`}
                                            />
                                        </motion.div>
                                    </div>

                                    <h3 className="mt-5 text-base font-semibold leading-6 sm:text-lg">
                                        {item.title}
                                    </h3>

                                    <p
                                        className={`mt-1 text-sm leading-6 ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {item.description}
                                    </p>

                                    <div className="mt-4 sm:mt-5">
                                        <motion.span
                                            key={item.count}
                                            initial={{
                                                opacity: 0,
                                                y: 6,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                            className="text-2xl font-bold sm:text-3xl"
                                        >
                                            {item.count}
                                        </motion.span>

                                        <span
                                            className={`ml-2 text-sm ${isDark
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                                }`}
                                        >
                                            resources
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Quick Overview */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        delay: 0.15,
                    }}
                    className={`mt-8 rounded-2xl border p-5 sm:mt-10 sm:p-6 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <motion.h2
                        variants={cardVariants}
                        className="text-lg font-bold sm:text-xl"
                    >
                        Quick Overview
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-6 sm:gap-6 md:grid-cols-4"
                    >

                        {/* Students */}
                        <motion.div variants={cardVariants}>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Students
                            </p>

                            <motion.p
                                key={students?.length || 0}
                                initial={{
                                    opacity: 0,
                                    y: 6,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="mt-1 text-xl font-bold sm:text-2xl"
                            >
                                {students?.length || 0}
                            </motion.p>
                        </motion.div>

                        {/* Faculty */}
                        <motion.div variants={cardVariants}>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Faculty
                            </p>

                            <motion.p
                                key={faculty?.length || 0}
                                initial={{
                                    opacity: 0,
                                    y: 6,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="mt-1 text-xl font-bold sm:text-2xl"
                            >
                                {faculty?.length || 0}
                            </motion.p>
                        </motion.div>

                        {/* Notes */}
                        <motion.div variants={cardVariants}>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Notes
                            </p>

                            <motion.p
                                key={resourceCounts.NOTES}
                                initial={{
                                    opacity: 0,
                                    y: 6,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="mt-1 text-xl font-bold sm:text-2xl"
                            >
                                {resourceCounts.NOTES}
                            </motion.p>
                        </motion.div>

                        {/* PYQs */}
                        <motion.div variants={cardVariants}>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                PYQs
                            </p>

                            <motion.p
                                key={resourceCounts.PYQ}
                                initial={{
                                    opacity: 0,
                                    y: 6,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="mt-1 text-xl font-bold sm:text-2xl"
                            >
                                {resourceCounts.PYQ}
                            </motion.p>
                        </motion.div>

                    </motion.div>
                </motion.div>

            </div>
        </motion.section>
    );
}

export default AdminDashboard;