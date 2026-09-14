import React, {
    useContext,
    useMemo,
    useState,
} from "react";

import {
    Search,
    Trash2,
    Users,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    pageVariants,
    containerVariants,
    cardVariants,
    fadeVariants,
} from "../../animations";

function AdminStudents() {
    const {
        isDark,
        students = [],
        setStudents,
        semesters = [],
        backendUrl,
        setIsLoading,
    } = useContext(Context);

    const [search, setSearch] = useState("");
    const [semester, setSemester] = useState("");
    const [batch, setBatch] = useState("");

    const batches = Array.from(
        { length: new Date().getFullYear() - 2025 + 1 },
        (_, index) => 2025 + index
    );

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesName = student.name
                ?.toLowerCase()
                .includes(search.toLowerCase().trim());

            const matchesSemester =
                !semester ||
                student.studentProfile?.semester ===
                Number(semester);

            const matchesBatch =
                !batch ||
                student.studentProfile?.batch === batch;

            return (
                matchesName &&
                matchesSemester &&
                matchesBatch
            );
        });
    }, [students, search, semester, batch]);

    async function handleDelete(student) {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${student.name}?`
        );

        if (!confirmed) return;

        try {
            setIsLoading(true);
            const response = await api.delete(
                `${backendUrl}/api/users/${student.id}`
            );

            if (response.data.success) {
                setStudents((prevStudents) =>
                    prevStudents.filter(
                        (item) => item.id !== student.id
                    )
                );
            }
        } catch (error) {
            console.error(
                "Delete student error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete student"
            );
        } finally {
            setIsLoading(false);
        }
    }

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
                    className="mb-7 sm:mb-8"
                >
                    <div className="flex items-center gap-3 sm:gap-4">

                        <motion.div
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.04,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${isDark
                                ? "bg-white text-black"
                                : "bg-black text-white"
                                }`}
                        >
                            <Users
                                size={21}
                                className="sm:h-6 sm:w-6"
                            />
                        </motion.div>

                        <div className="min-w-0">
                            <motion.h1
                                variants={cardVariants}
                                className="text-2xl font-bold sm:text-3xl md:text-4xl"
                            >
                                Students
                            </motion.h1>

                            <motion.p
                                variants={cardVariants}
                                className={`mt-1 text-xs sm:text-sm ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                Manage registered students
                            </motion.p>
                        </div>

                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        delay: 0.12,
                    }}
                    className={`mb-5 rounded-2xl border p-4 sm:mb-6 sm:p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
                    >

                        {/* Search */}
                        <motion.div
                            variants={cardVariants}
                            className="relative"
                        >
                            <Search
                                size={19}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />

                            <motion.input
                                type="text"
                                placeholder="Search student by name..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    }`}
                            />
                        </motion.div>

                        {/* Batch */}
                        <motion.select
                            variants={cardVariants}
                            value={batch}
                            onChange={(e) =>
                                setBatch(e.target.value)
                            }
                            whileFocus={{
                                scale: 1.005,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className={`w-full rounded-xl border px-3 py-3 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                ? "border-gray-700 bg-gray-800 text-white focus:border-white"
                                : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                }`}
                        >
                            <option value="">
                                All Batches
                            </option>

                            {batches.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </motion.select>

                        {/* Semester */}
                        <motion.select
                            variants={cardVariants}
                            value={semester}
                            onChange={(e) =>
                                setSemester(e.target.value)
                            }
                            whileFocus={{
                                scale: 1.005,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className={`w-full rounded-xl border px-3 py-3 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                ? "border-gray-700 bg-gray-800 text-white focus:border-white"
                                : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                }`}
                        >
                            <option value="">
                                All Semesters
                            </option>

                            {semesters.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.number}
                                >
                                    Semester {item.number}
                                </option>
                            ))}
                        </motion.select>

                    </motion.div>
                </motion.div>

                {/* Student Count */}
                <motion.div
                    key={`${filteredStudents.length}-${search}-${semester}-${batch}`}
                    initial={{
                        opacity: 0,
                        y: 5,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                    className={`mb-4 text-xs sm:text-sm ${isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                        }`}
                >
                    Showing{" "}
                    <span
                        className={`font-semibold ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        {filteredStudents.length}
                    </span>{" "}
                    students
                </motion.div>

                {/* Table */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        delay: 0.18,
                    }}
                    className={`overflow-hidden rounded-2xl border ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">

                            {/* Table Header */}
                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Register No.
                                    </th>

                                    <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Name
                                    </th>

                                    <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Batch
                                    </th>

                                    <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Semester
                                    </th>

                                    <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Email
                                    </th>

                                    <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody
                                className={`divide-y ${isDark
                                    ? "divide-gray-800"
                                    : "divide-gray-200"
                                    }`}
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredStudents.length ===
                                        0 ? (
                                        <motion.tr
                                            key="empty"
                                            variants={fadeVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <td
                                                colSpan="6"
                                                className={`px-4 py-10 text-center sm:px-6 sm:py-12 ${isDark
                                                    ? "text-gray-500"
                                                    : "text-gray-500"
                                                    }`}
                                            >
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.95,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                >
                                                    <Users
                                                        size={36}
                                                        className="mx-auto mb-3 opacity-50 sm:h-10 sm:w-10"
                                                    />

                                                    <p className="text-sm font-medium sm:text-base">
                                                        No students found
                                                    </p>

                                                    <p className="mt-1 text-xs sm:text-sm">
                                                        Try changing your
                                                        search or semester
                                                        filter.
                                                    </p>
                                                </motion.div>
                                            </td>
                                        </motion.tr>
                                    ) : (
                                        filteredStudents.map(
                                            (student) => (
                                                <motion.tr
                                                    key={student.id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    transition={{
                                                        duration: 0.25,
                                                        ease: "easeOut",
                                                    }}
                                                    className={`transition-colors ${isDark
                                                        ? "hover:bg-gray-800/50"
                                                        : "hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {/* Register Number */}
                                                    <td
                                                        className={`whitespace-nowrap px-4 py-4 text-sm font-medium sm:px-6 ${isDark
                                                            ? "text-white"
                                                            : "text-gray-900"
                                                            }`}
                                                    >
                                                        {
                                                            student
                                                                .studentProfile
                                                                ?.registerNumber ||
                                                            "N/A"
                                                        }
                                                    </td>

                                                    {/* Name */}
                                                    <td
                                                        className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                            ? "text-gray-200"
                                                            : "text-gray-700"
                                                            }`}
                                                    >
                                                        <span className="block max-w-[160px] truncate sm:max-w-none">
                                                            {
                                                                student.name
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* Batch */}
                                                    <td
                                                        className={`whitespace-nowrap px-4 py-4 text-sm sm:px-6 ${isDark
                                                            ? "text-gray-400"
                                                            : "text-gray-600"
                                                            }`}
                                                    >
                                                        {student
                                                            .studentProfile
                                                            ?.batch
                                                            ? `${student.studentProfile.batch}`
                                                            : "N/A"}
                                                    </td>

                                                    {/* Semester */}
                                                    <td
                                                        className={`whitespace-nowrap px-4 py-4 text-sm sm:px-6 ${isDark
                                                            ? "text-gray-400"
                                                            : "text-gray-600"
                                                            }`}
                                                    >
                                                        {student
                                                            .studentProfile
                                                            ?.semester
                                                            ? `Semester ${student.studentProfile.semester}`
                                                            : "N/A"}
                                                    </td>

                                                    {/* Email */}
                                                    <td
                                                        className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                            ? "text-gray-400"
                                                            : "text-gray-600"
                                                            }`}
                                                    >
                                                        <span className="block max-w-[220px] truncate sm:max-w-none">
                                                            {
                                                                student.email
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <div className="flex justify-center">

                                                            <motion.button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        student
                                                                    )
                                                                }
                                                                title="Delete student"
                                                                aria-label={`Delete ${student.name}`}
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                                transition={{
                                                                    duration: 0.15,
                                                                }}
                                                                className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </motion.button>

                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )
                                        )
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Mobile hint */}
                <AnimatePresence>
                    {filteredStudents.length > 0 && (
                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className={`mt-3 text-center text-xs sm:hidden ${isDark
                                ? "text-gray-600"
                                : "text-gray-400"
                                }`}
                        >
                            Swipe horizontally to view all columns
                        </motion.p>
                    )}
                </AnimatePresence>

            </div>
        </motion.section>
    );
}

export default AdminStudents;