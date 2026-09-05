import React, { useContext, useEffect, useMemo } from "react";
import {
    Users,
    GraduationCap,
    BookOpen,
    FileText,
    ClipboardList,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";

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

        if (user.role !== "ADMIN") {
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
        <section
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <p
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Administration
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                        Dashboard
                    </h1>

                    <p
                        className={`mt-2 text-sm sm:mt-3 sm:text-base ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        Overview of your BVOC SD platform.
                    </p>
                </div>

                {/* Main Statistics */}
                <div className="mb-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:mb-12 lg:grid-cols-3">
                    {statistics.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.title}
                                type="button"
                                onClick={() => navigate(item.path)}
                                className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 sm:p-6 ${isDark
                                    ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                    : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${isDark
                                            ? "bg-white text-black"
                                            : "bg-black text-white"
                                            }`}
                                    >
                                        <Icon
                                            size={22}
                                            className="sm:h-6 sm:w-6"
                                        />
                                    </div>

                                    <ArrowRight
                                        size={20}
                                        className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </div>

                                <p
                                    className={`mt-5 text-sm sm:mt-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-bold sm:text-4xl">
                                    {item.count}
                                </h2>

                                <p
                                    className={`mt-2 text-sm ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {item.description}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Resources */}
                <div>
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

                        <button
                            type="button"
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
                        </button>
                    </div>

                    {/* Resource Type Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                        {resourceTypes.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() =>
                                        navigate(item.path)
                                    }
                                    className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 sm:p-6 ${isDark
                                        ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                        : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-4">

                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${isDark
                                                ? "bg-gray-800 text-white"
                                                : "bg-gray-100 text-black"
                                                }`}
                                        >
                                            <Icon
                                                size={21}
                                                className="sm:h-[22px] sm:w-[22px]"
                                            />
                                        </div>

                                        <ArrowRight
                                            size={19}
                                            className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isDark
                                                ? "text-gray-600"
                                                : "text-gray-400"
                                                }`}
                                        />
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
                                        <span className="text-2xl font-bold sm:text-3xl">
                                            {item.count}
                                        </span>

                                        <span
                                            className={`ml-2 text-sm ${isDark
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                                }`}
                                        >
                                            resources
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Overview */}
                <div
                    className={`mt-8 rounded-2xl border p-5 sm:mt-10 sm:p-6 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <h2 className="text-lg font-bold sm:text-xl">
                        Quick Overview
                    </h2>

                    <div className="mt-5 grid grid-cols-2 gap-y-6 gap-x-4 sm:mt-6 sm:gap-6 md:grid-cols-4">

                        {/* Students */}
                        <div>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Students
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl">
                                {students?.length || 0}
                            </p>
                        </div>

                        {/* Faculty */}
                        <div>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Faculty
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl">
                                {faculty?.length || 0}
                            </p>
                        </div>

                        {/* Notes */}
                        <div>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Notes
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl">
                                {resourceCounts.NOTES}
                            </p>
                        </div>

                        {/* PYQs */}
                        <div>
                            <p
                                className={`text-xs sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                PYQs
                            </p>

                            <p className="mt-1 text-xl font-bold sm:text-2xl">
                                {resourceCounts.PYQ}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default AdminDashboard;