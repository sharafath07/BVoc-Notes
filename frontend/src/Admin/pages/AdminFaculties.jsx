import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    Trash2,
    Users,
    UserPlus,
    Mail,
    ShieldCheck,
    RefreshCw,
    X,
    AlertTriangle,
    UserRound,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { Context } from "../../Context/Context";


/* -------------------------------------------------------------------------- */
/*                                Animations                                  */
/* -------------------------------------------------------------------------- */

const pageVariants = {
    hidden: {
        opacity: 0,
        y: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 12,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut",
        },
    },
};

const rowVariants = {
    hidden: {
        opacity: 0,
        y: 8,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: {
            duration: 0.2,
        },
    },
};


/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

function getInitials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}


function AdminFaculties() {
    const { isDark, backendUrl, isAdmin } = useContext(Context);
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [deletingId, setDeletingId] = useState(null);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");


    /* ---------------------------------------------------------------------- */
    /*                              Fetch Teachers                            */
    /* ---------------------------------------------------------------------- */

    const fetchTeachers = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`${backendUrl}/api/teachers`);

            setTeachers(response.data.teachers || []);
        } catch (error) {
            console.error("Fetch teachers error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch teachers"
            );
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);


    /* ---------------------------------------------------------------------- */
    /*                                Search                                  */
    /* ---------------------------------------------------------------------- */

    const filteredTeachers = useMemo(() => {
        const searchTerm = search.trim().toLowerCase();

        if (!searchTerm) {
            return teachers;
        }

        return teachers.filter((teacher) => {
            const name = teacher.name?.toLowerCase() || "";
            const email = teacher.email?.toLowerCase() || "";

            return (
                name.includes(searchTerm) ||
                email.includes(searchTerm)
            );
        });
    }, [teachers, search]);

    /* ---------------------------------------------------------------------- */
    /*                              Delete Teacher                            */
    /* ---------------------------------------------------------------------- */

    const handleDelete = async () => {
        if (!teacherToDelete) return;

        const teacher = teacherToDelete;

        try {
            setDeletingId(teacher.id);
            setError("");
            setSuccessMessage("");

            await api.delete(
                `${backendUrl}/api/teachers/${teacher.id}`
            );

            setTeachers((currentTeachers) =>
                currentTeachers.filter(
                    (item) => item.id !== teacher.id
                )
            );

            setTeacherToDelete(null);

            setSuccessMessage(
                `${teacher.name} was deleted successfully.`
            );

            setTimeout(() => {
                setSuccessMessage("");
            }, 3500);
        } catch (error) {
            console.error("Delete teacher error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete teacher"
            );

            setTeacherToDelete(null);
        } finally {
            setDeletingId(null);
        }
    };


    /* ---------------------------------------------------------------------- */
    /*                                  UI                                    */
    /* ---------------------------------------------------------------------- */

    return (
        <motion.main
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className={`min-h-screen w-full font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

                {/* =========================================================
                                    HEADER
                ========================================================== */}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        {/* Title */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-start gap-4"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.06,
                                    rotate: 2,
                                }}
                                whileTap={{
                                    scale: 0.96,
                                }}
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isDark
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                    }`}
                            >
                                <Users size={23} />
                            </motion.div>

                            <div>
                                <p
                                    className={`mb-1 text-xs font-semibold uppercase tracking-[0.18em] ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                >
                                    Administration
                                </p>

                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Faculties
                                </h1>

                                <p
                                    className={`mt-1.5 max-w-xl text-sm sm:text-base ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Manage faculty accounts and access
                                    within B.Voc SD.
                                </p>
                            </div>
                        </motion.div>


                        {/* Register Button */}
                        {isAdmin && (
                            <motion.button
                                variants={itemVariants}
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/admin/dashboard/faculties/register"
                                    )
                                }
                                whileHover={{
                                    scale: 1.02,
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className={`group flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition sm:w-auto ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                <UserPlus
                                    size={18}
                                    className="transition-transform duration-200 group-hover:rotate-6"
                                />

                                <span>Register Teacher</span>
                            </motion.button>)}
                    </div>
                </motion.div>


                {/* =========================================================
                                  ALERT MESSAGES
                ========================================================== */}

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                height: "auto",
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                                height: 0,
                            }}
                            className="mb-6 overflow-hidden"
                        >
                            <div
                                className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm ${isDark
                                    ? "border-red-900/60 bg-red-950/40 text-red-300"
                                    : "border-red-200 bg-red-50 text-red-600"
                                    }`}
                            >
                                <AlertTriangle
                                    size={18}
                                    className="mt-0.5 shrink-0"
                                />

                                <p className="flex-1">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setError("")}
                                    className="shrink-0 opacity-70 transition hover:opacity-100"
                                >
                                    <X size={17} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <AnimatePresence>
                    {successMessage && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                                scale: 0.98,
                            }}
                            className={`mb-6 rounded-2xl border px-4 py-3.5 text-sm ${isDark
                                ? "border-emerald-900/60 bg-emerald-950/40 text-emerald-300"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                }`}
                        >
                            {successMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* =========================================================
                                   SEARCH CARD
                ========================================================== */}

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`mb-5 rounded-2xl border p-4 sm:p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-sm"
                        }`}
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="relative w-full sm:max-w-lg">
                            <Search
                                size={18}
                                className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />

                            <motion.input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                placeholder="Search by teacher name or email..."
                                className={`w-full rounded-xl border py-3 pl-10 pr-10 text-sm outline-none transition sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-white"
                                    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    }`}
                            />

                            <AnimatePresence>
                                {search && (
                                    <motion.button
                                        type="button"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                        }}
                                        onClick={() => setSearch("")}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition ${isDark
                                            ? "text-gray-500 hover:bg-gray-800 hover:text-white"
                                            : "text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                                            }`}
                                    >
                                        <X size={16} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>


                        <div
                            className={`flex items-center gap-2 text-sm ${isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                                }`}
                        >
                            <span>Showing</span>

                            <motion.span
                                key={filteredTeachers.length}
                                initial={{
                                    opacity: 0,
                                    y: 4,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className={`font-semibold ${isDark
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}
                            >
                                {filteredTeachers.length}
                            </motion.span>

                            <span>
                                {filteredTeachers.length === 1
                                    ? "teacher"
                                    : "teachers"}
                            </span>
                        </div>
                    </div>
                </motion.div>


                {/* =========================================================
                                  TEACHER LIST
                ========================================================== */}

                {loading ? (
                    <TeacherSkeleton isDark={isDark} />
                ) : (
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className={`overflow-hidden rounded-2xl border ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white shadow-sm"
                            }`}
                    >
                        {filteredTeachers.length === 0 ? (
                            <EmptyState
                                isDark={isDark}
                                hasSearch={Boolean(search)}
                                onClear={() => setSearch("")}
                            />
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="w-full text-left">
                                        <thead
                                            className={
                                                isDark
                                                    ? "bg-gray-800/70"
                                                    : "bg-gray-50"
                                            }
                                        >
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                                                    Teacher
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                                                    Email
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                                                    Status
                                                </th>

                                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody
                                            className={`divide-y ${isDark
                                                ? "divide-gray-800"
                                                : "divide-gray-100"
                                                }`}
                                        >
                                            <AnimatePresence mode="popLayout">
                                                {filteredTeachers.map(
                                                    (teacher, index) => (
                                                        <motion.tr
                                                            key={teacher.id}
                                                            variants={
                                                                rowVariants
                                                            }
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            transition={{
                                                                delay:
                                                                    index *
                                                                    0.03,
                                                            }}
                                                            className={`group transition-colors ${isDark
                                                                ? "hover:bg-gray-800/50"
                                                                : "hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            {/* Teacher */}
                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center gap-3">
                                                                    <motion.div
                                                                        whileHover={{
                                                                            scale: 1.08,
                                                                        }}
                                                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${isDark
                                                                            ? "bg-white text-black"
                                                                            : "bg-black text-white"
                                                                            }`}
                                                                    >
                                                                        {getInitials(
                                                                            teacher.name
                                                                        )}
                                                                    </motion.div>

                                                                    <div className="min-w-0">
                                                                        <p
                                                                            className={`truncate font-semibold ${isDark
                                                                                ? "text-white"
                                                                                : "text-gray-900"
                                                                                }`}
                                                                        >
                                                                            {
                                                                                teacher.name
                                                                            }
                                                                        </p>

                                                                        <p
                                                                            className={`mt-0.5 text-xs ${isDark
                                                                                ? "text-gray-500"
                                                                                : "text-gray-400"
                                                                                }`}
                                                                        >
                                                                            Teacher
                                                                            account
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>


                                                            {/* Email */}
                                                            <td className="px-6 py-5">
                                                                <div
                                                                    className={`flex items-center gap-2 text-sm ${isDark
                                                                        ? "text-gray-400"
                                                                        : "text-gray-600"
                                                                        }`}
                                                                >
                                                                    <Mail
                                                                        size={
                                                                            15
                                                                        }
                                                                        className="shrink-0"
                                                                    />

                                                                    <span className="truncate">
                                                                        {
                                                                            teacher.email
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>


                                                            {/* Status */}
                                                            <td className="px-6 py-5">
                                                                <span
                                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${teacher.status ===
                                                                        "ACTIVE"
                                                                        ? isDark
                                                                            ? "bg-emerald-950/50 text-emerald-300"
                                                                            : "bg-emerald-50 text-emerald-700"
                                                                        : isDark
                                                                            ? "bg-gray-800 text-gray-400"
                                                                            : "bg-gray-100 text-gray-500"
                                                                        }`}
                                                                >
                                                                    <span
                                                                        className={`h-1.5 w-1.5 rounded-full ${teacher.status ===
                                                                            "ACTIVE"
                                                                            ? "bg-emerald-500"
                                                                            : "bg-gray-400"
                                                                            }`}
                                                                    />

                                                                    {teacher.status ===
                                                                        "ACTIVE"
                                                                        ? "Active"
                                                                        : "Suspended"}
                                                                </span>
                                                            </td>


                                                            {/* Delete */}
                                                            {isAdmin && (
                                                                <td className="px-6 py-5">
                                                                    <div className="flex justify-end">
                                                                        <motion.button
                                                                            type="button"
                                                                            disabled={
                                                                                deletingId ===
                                                                                teacher.id
                                                                            }
                                                                            onClick={() =>
                                                                                setTeacherToDelete(
                                                                                    teacher
                                                                                )
                                                                            }
                                                                            whileHover={{
                                                                                scale: 1.05,
                                                                            }}
                                                                            whileTap={{
                                                                                scale: 0.95,
                                                                            }}
                                                                            title="Delete teacher"
                                                                            className={`rounded-xl border p-2.5 transition ${isDark
                                                                                ? "border-gray-700 text-gray-400 hover:border-red-900 hover:bg-red-950/40 hover:text-red-400"
                                                                                : "border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                                                                } disabled:cursor-not-allowed disabled:opacity-50`}
                                                                        >
                                                                            {deletingId ===
                                                                                teacher.id ? (
                                                                                <RefreshCw
                                                                                    size={
                                                                                        17
                                                                                    }
                                                                                    className="animate-spin"
                                                                                />
                                                                            ) : (
                                                                                <Trash2
                                                                                    size={
                                                                                        17
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </motion.button>
                                                                    </div>
                                                                </td>
                                                            )}
                                                        </motion.tr>
                                                    )
                                                )}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>


                                {/* Mobile Cards */}
                                <div className="divide-y md:hidden">
                                    <AnimatePresence mode="popLayout">
                                        {filteredTeachers.map(
                                            (teacher, index) => (
                                                <motion.div
                                                    key={teacher.id}
                                                    variants={rowVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    transition={{
                                                        delay:
                                                            index * 0.03,
                                                    }}
                                                    className={`p-4 ${isDark
                                                        ? "divide-gray-800"
                                                        : "divide-gray-100"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex min-w-0 items-center gap-3">
                                                            <div
                                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${isDark
                                                                    ? "bg-white text-black"
                                                                    : "bg-black text-white"
                                                                    }`}
                                                            >
                                                                {getInitials(
                                                                    teacher.name
                                                                )}
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p
                                                                    className={`truncate font-semibold ${isDark
                                                                        ? "text-white"
                                                                        : "text-gray-900"
                                                                        }`}
                                                                >
                                                                    {
                                                                        teacher.name
                                                                    }
                                                                </p>

                                                                <div
                                                                    className={`mt-1 flex items-center gap-1.5 text-xs ${isDark
                                                                        ? "text-gray-500"
                                                                        : "text-gray-500"
                                                                        }`}
                                                                >
                                                                    <Mail
                                                                        size={
                                                                            13
                                                                        }
                                                                    />

                                                                    <span className="truncate">
                                                                        {
                                                                            teacher.email
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {isAdmin && (<motion.button
                                                            type="button"
                                                            disabled={
                                                                deletingId ===
                                                                teacher.id
                                                            }
                                                            onClick={() =>
                                                                setTeacherToDelete(
                                                                    teacher
                                                                )
                                                            }
                                                            whileTap={{
                                                                scale: 0.92,
                                                            }}
                                                            className={`shrink-0 rounded-xl border p-2.5 ${isDark
                                                                ? "border-gray-700 text-gray-400"
                                                                : "border-gray-200 text-gray-400"
                                                                }`}
                                                        >
                                                            {deletingId ===
                                                                teacher.id ? (
                                                                <RefreshCw
                                                                    size={16}
                                                                    className="animate-spin"
                                                                />
                                                            ) : (
                                                                <Trash2
                                                                    size={16}
                                                                />
                                                            )}
                                                        </motion.button>)}
                                                    </div>

                                                    <div className="mt-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${teacher.status ===
                                                                "ACTIVE"
                                                                ? isDark
                                                                    ? "bg-emerald-950/50 text-emerald-300"
                                                                    : "bg-emerald-50 text-emerald-700"
                                                                : isDark
                                                                    ? "bg-gray-800 text-gray-400"
                                                                    : "bg-gray-100 text-gray-500"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${teacher.status ===
                                                                    "ACTIVE"
                                                                    ? "bg-emerald-500"
                                                                    : "bg-gray-400"
                                                                    }`}
                                                            />

                                                            {teacher.status ===
                                                                "ACTIVE"
                                                                ? "Active"
                                                                : "Suspended"}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}


                {/* Mobile hint */}
                {!loading && filteredTeachers.length > 0 && (
                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        className={`mt-3 text-center text-xs md:hidden ${isDark
                            ? "text-gray-600"
                            : "text-gray-400"
                            }`}
                    >
                        Swipe horizontally to view all information
                    </motion.p>
                )}
            </div>


            {/* =============================================================
                              DELETE CONFIRMATION MODAL
            ============================================================== */}

            <AnimatePresence>
                {teacherToDelete && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
                        onClick={() =>
                            !deletingId &&
                            setTeacherToDelete(null)
                        }
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                scale: 0.96,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                                scale: 0.96,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${isDark
                                ? "border-gray-800 bg-gray-900"
                                : "border-gray-200 bg-white"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isDark
                                        ? "bg-red-950/50 text-red-400"
                                        : "bg-red-50 text-red-500"
                                        }`}
                                >
                                    <AlertTriangle size={21} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">
                                        Delete teacher?
                                    </h2>

                                    <p
                                        className={`mt-1.5 text-sm leading-6 ${isDark
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Are you sure you want to delete{" "}
                                        <span className="font-semibold">
                                            {teacherToDelete.name}
                                        </span>
                                        ? This action cannot be undone.
                                    </p>
                                </div>
                            </div>


                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    disabled={Boolean(deletingId)}
                                    onClick={() =>
                                        setTeacherToDelete(null)
                                    }
                                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${isDark
                                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    Cancel
                                </button>

                                <motion.button
                                    type="button"
                                    disabled={Boolean(deletingId)}
                                    onClick={handleDelete}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {deletingId ? (
                                        <>
                                            <RefreshCw
                                                size={16}
                                                className="animate-spin"
                                            />

                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={16} />

                                            Delete Teacher
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
}


/* -------------------------------------------------------------------------- */
/*                              Loading Skeleton                              */
/* -------------------------------------------------------------------------- */

function TeacherSkeleton({ isDark }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            className={`overflow-hidden rounded-2xl border ${isDark
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white shadow-sm"
                }`}
        >
            <div className="hidden md:block">
                <div
                    className={`h-14 ${isDark
                        ? "bg-gray-800"
                        : "bg-gray-50"
                        }`}
                />

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className={`flex items-center gap-6 border-t px-6 py-5 ${isDark
                            ? "border-gray-800"
                            : "border-gray-100"
                            }`}
                    >
                        <div
                            className={`h-10 w-10 animate-pulse rounded-xl ${isDark
                                ? "bg-gray-800"
                                : "bg-gray-200"
                                }`}
                        />

                        <div className="flex-1 space-y-2">
                            <div
                                className={`h-3 w-40 animate-pulse rounded ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                    }`}
                            />

                            <div
                                className={`h-2.5 w-24 animate-pulse rounded ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                    }`}
                            />
                        </div>

                        <div
                            className={`h-3 w-48 animate-pulse rounded ${isDark
                                ? "bg-gray-800"
                                : "bg-gray-200"
                                }`}
                        />

                        <div
                            className={`h-7 w-16 animate-pulse rounded-full ${isDark
                                ? "bg-gray-800"
                                : "bg-gray-200"
                                }`}
                        />

                        <div
                            className={`h-9 w-9 animate-pulse rounded-xl ${isDark
                                ? "bg-gray-800"
                                : "bg-gray-200"
                                }`}
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-4 p-4 md:hidden">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-3"
                    >
                        <div
                            className={`h-10 w-10 animate-pulse rounded-xl ${isDark
                                ? "bg-gray-800"
                                : "bg-gray-200"
                                }`}
                        />

                        <div className="flex-1 space-y-2">
                            <div
                                className={`h-3 w-32 animate-pulse rounded ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                    }`}
                            />

                            <div
                                className={`h-2.5 w-44 animate-pulse rounded ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                    }`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}


/* -------------------------------------------------------------------------- */
/*                                Empty State                                 */
/* -------------------------------------------------------------------------- */

function EmptyState({
    isDark,
    hasSearch,
    onClear,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.97,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center"
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.1,
                }}
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${isDark
                    ? "bg-gray-800 text-gray-500"
                    : "bg-gray-100 text-gray-400"
                    }`}
            >
                {hasSearch ? (
                    <Search size={28} />
                ) : (
                    <UserRound size={28} />
                )}
            </motion.div>

            <h3 className="text-base font-semibold sm:text-lg">
                {hasSearch
                    ? "No teachers found"
                    : "No teachers yet"}
            </h3>

            <p
                className={`mt-1.5 max-w-sm text-sm ${isDark
                    ? "text-gray-500"
                    : "text-gray-500"
                    }`}
            >
                {hasSearch
                    ? "Try searching with a different name or email."
                    : "Register your first teacher to start managing faculty accounts."}
            </p>

            {hasSearch && (
                <button
                    type="button"
                    onClick={onClear}
                    className={`mt-5 rounded-xl px-4 py-2 text-sm font-medium transition ${isDark
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                        }`}
                >
                    Clear Search
                </button>
            )}
        </motion.div>
    );
}


export default AdminFaculties;