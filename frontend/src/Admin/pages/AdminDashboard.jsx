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
            NOTES: resources?.filter(
                (resource) => resource.type === "NOTES"
            ).length,

            SYLLABUS: resources?.filter(
                (resource) => resource.type === "SYLLABUS"
            ).length,

            PYQ: resources?.filter(
                (resource) => resource.type === "PYQ"
            ).length,
        };
    }, [resources]);

    const statistics = [
        {
            title: "Students",
            count: students.length,
            description: "Registered students",
            icon: GraduationCap,
            path: "/admin/dashboard/students",
        },
        {
            title: "Faculty",
            count: faculty.length,
            description: "Faculty members",
            icon: Users,
            path: "/admin/dashboard/faculties",
        },
        {
            title: "Resources",
            count: resources.length,
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
            className={`min-h-screen px-6 py-24 font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10">
                    <p
                        className={`mb-2 text-sm font-semibold uppercase tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Administration
                    </p>

                    <h1 className="text-4xl font-bold">
                        Dashboard
                    </h1>

                    <p
                        className={`mt-3 ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        Overview of your BVOC SD platform.
                    </p>
                </div>

                {/* Main Statistics */}
                <div className="mb-12 grid gap-5 md:grid-cols-3">

                    {statistics.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.title}
                                type="button"
                                onClick={() => navigate(item.path)}
                                className={`group rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 ${isDark
                                    ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                    : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                                    }`}
                            >
                                <div className="flex items-start justify-between">

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                            ? "bg-white text-black"
                                            : "bg-black text-white"
                                            }`}
                                    >
                                        <Icon size={24} />
                                    </div>

                                    <ArrowRight
                                        size={20}
                                        className={`transition-transform duration-200 group-hover:translate-x-1 ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </div>

                                <p
                                    className={`mt-6 text-sm ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {item.title}
                                </p>

                                <h2 className="mt-1 text-4xl font-bold">
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
                    <div className="mb-6 flex items-end justify-between">

                        <div>
                            <h2 className="text-2xl font-bold">
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
                                navigate("/admin/resources")
                            }
                            className={`text-sm font-medium transition hover:underline ${isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            View all
                        </button>

                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        {resourceTypes.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() =>
                                        navigate(item.path)
                                    }
                                    className={`group rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 ${isDark
                                        ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                        : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">

                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${isDark
                                                ? "bg-gray-800 text-white"
                                                : "bg-gray-100 text-black"
                                                }`}
                                        >
                                            <Icon size={22} />
                                        </div>

                                        <ArrowRight
                                            size={19}
                                            className={`transition-transform duration-200 group-hover:translate-x-1 ${isDark
                                                ? "text-gray-600"
                                                : "text-gray-400"
                                                }`}
                                        />

                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold">
                                        {item.title}
                                    </h3>

                                    <p
                                        className={`mt-1 text-sm ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {item.description}
                                    </p>

                                    <div className="mt-5">
                                        <span className="text-3xl font-bold">
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
                    className={`mt-10 rounded-2xl border p-6 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <h2 className="text-xl font-bold">
                        Quick Overview
                    </h2>

                    <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">

                        <div>
                            <p
                                className={`text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Students
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {students.length}
                            </p>
                        </div>

                        <div>
                            <p
                                className={`text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Faculty
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {faculty.length}
                            </p>
                        </div>

                        <div>
                            <p
                                className={`text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Notes
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {resourceCounts.NOTES}
                            </p>
                        </div>

                        <div>
                            <p
                                className={`text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                PYQs
                            </p>

                            <p className="mt-1 text-2xl font-bold">
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