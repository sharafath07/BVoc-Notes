import React, {
    useContext,
    useMemo,
    useState,
} from "react";

import { motion, AnimatePresence } from "motion/react";

import { useNavigate } from "react-router-dom";

import {
    BookOpen,
    ChevronDown,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    pageVariants,
    cardVariants,
    containerVariants,
    buttonVariants,
    listItemVariants,
} from "../../animations";

function AdminSubjects() {
    const {
        backendUrl,
        isDark,
        program = [],
        semesters = [],
        subjects = [],
        setSubjects,
    } = useContext(Context);

    const navigate = useNavigate();

    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [deletingId, setDeletingId] = useState(null);

    /*
     * Semesters belonging to selected program
     */
    const filteredSemesters = useMemo(() => {
        if (!selectedProgram) return [];

        return semesters
            .filter(
                (semester) =>
                    semester.programId === selectedProgram
            )
            .sort((a, b) => a.number - b.number);
    }, [selectedProgram, semesters]);

    /*
     * Filter subjects
     *
     * Program is determined through:
     *
     * Subject → Semester → Program
     */
    const filteredSubjects = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return subjects.filter((subject) => {
            const semester = semesters.find(
                (item) =>
                    item.id === subject.semesterId
            );

            if (!semester) return false;

            /*
             * Program filter
             */
            if (
                selectedProgram &&
                semester.programId !== selectedProgram
            ) {
                return false;
            }

            /*
             * Semester filter
             */
            if (
                selectedSemester &&
                subject.semesterId !== selectedSemester
            ) {
                return false;
            }

            /*
             * Search filter
             */
            if (
                search &&
                !subject.name
                    .toLowerCase()
                    .includes(search)
            ) {
                return false;
            }

            return true;
        });
    }, [
        subjects,
        semesters,
        selectedProgram,
        selectedSemester,
        searchTerm,
    ]);

    /*
     * Get semester
     */
    const getSemester = (semesterId) => {
        return semesters.find(
            (semester) =>
                semester.id === semesterId
        );
    };

    /*
     * Get program from semester
     */
    const getProgram = (semesterId) => {
        const semester = getSemester(semesterId);

        if (!semester) return null;

        return program.find(
            (item) =>
                item.id === semester.programId
        );
    };

    /*
     * Program changed
     */
    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);

        /*
         * Semester belongs to the previous program,
         * so reset it.
         */
        setSelectedSemester("");
    };

    /*
     * Delete subject
     */
    const handleDeleteSubject = async (subject) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${subject.name}"?`
        );

        if (!confirmed) return;

        try {
            setIsLoading(true);
            setDeletingId(subject.id);

            const response = await api.delete(
                `${backendUrl}/api/subjects/${subject.id}`
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Failed to delete subject"
                );
            }

            setSubjects((currentSubjects) =>
                currentSubjects.filter(
                    (item) =>
                        item.id !== subject.id
                )
            );
        } catch (error) {
            console.error(
                "Delete subject error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete subject"
            );
        } finally {
            setDeletingId(null);
            setIsLoading(false);
        }
    };

    /*
     * Clear filters
     */
    const clearFilters = () => {
        setSelectedProgram("");
        setSelectedSemester("");
        setSearchTerm("");
    };

    return (
        <motion.section
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className={`min-h-screen w-full px-4 py-6 font-roboto transition-colors duration-300 sm:px-6 sm:py-8 lg:px-8 ${isDark
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
                    className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
                >
                    <motion.div variants={cardVariants}>
                        <p
                            className={`mb-1 text-xs font-semibold uppercase tracking-[0.15em] ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Administration
                        </p>

                        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            Subjects
                        </h1>

                        <p
                            className={`mt-2 max-w-2xl text-sm ${isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                                }`}
                        >
                            Manage subjects across programs
                            and semesters.
                        </p>
                    </motion.div>

                    {/* Add Subject */}
                    <motion.button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/dashboard/subjects/add"
                            )
                        }
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:w-auto ${isDark
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-black text-white hover:bg-gray-800"
                            }`}
                    >
                        <Plus size={18} />
                        Add Subject
                    </motion.button>
                </motion.div>

                {/* Filters */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.4,
                        delay: 0.08,
                        ease: "easeOut",
                    }}
                    className={`mb-6 rounded-2xl border p-4 sm:p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-sm"
                        }`}
                >
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                        {/* Search */}
                        <div className="lg:col-span-1">
                            <label
                                htmlFor="subject-search"
                                className="mb-2 block text-sm font-medium"
                            >
                                Search Subject
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <motion.input
                                    id="subject-search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Search subject..."
                                    whileFocus={{
                                        scale: 1.005,
                                    }}
                                    transition={{
                                        duration: 0.15,
                                    }}
                                    className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-gray-500"
                                        : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Program */}
                        <div>
                            <label
                                htmlFor="program-filter"
                                className="mb-2 block text-sm font-medium"
                            >
                                Program
                            </label>

                            <div className="relative">
                                <motion.select
                                    id="program-filter"
                                    value={selectedProgram}
                                    onChange={
                                        handleProgramChange
                                    }
                                    whileFocus={{
                                        scale: 1.005,
                                    }}
                                    transition={{
                                        duration: 0.15,
                                    }}
                                    className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white focus:border-gray-500"
                                        : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                        }`}
                                >
                                    <option value="">
                                        All Programs
                                    </option>

                                    {program.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </motion.select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
                                />
                            </div>
                        </div>

                        {/* Semester */}
                        <div>
                            <label
                                htmlFor="semester-filter"
                                className="mb-2 block text-sm font-medium"
                            >
                                Semester
                            </label>

                            <div className="relative">
                                <motion.select
                                    id="semester-filter"
                                    value={selectedSemester}
                                    onChange={(event) =>
                                        setSelectedSemester(
                                            event.target.value
                                        )
                                    }
                                    disabled={
                                        !selectedProgram
                                    }
                                    whileFocus={
                                        selectedProgram
                                            ? {
                                                scale: 1.005,
                                            }
                                            : undefined
                                    }
                                    transition={{
                                        duration: 0.15,
                                    }}
                                    className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50 ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white focus:border-gray-500"
                                        : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                        }`}
                                >
                                    <option value="">
                                        {selectedProgram
                                            ? "All Semesters"
                                            : "Select Program First"}
                                    </option>

                                    {filteredSemesters.map(
                                        (semester) => (
                                            <option
                                                key={
                                                    semester.id
                                                }
                                                value={
                                                    semester.id
                                                }
                                            >
                                                Semester{" "}
                                                {
                                                    semester.number
                                                }
                                            </option>
                                        )
                                    )}
                                </motion.select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter footer */}
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p
                            className={`text-xs sm:text-sm ${isDark
                                ? "text-gray-500"
                                : "text-gray-500"
                                }`}
                        >
                            {filteredSubjects.length}{" "}
                            {filteredSubjects.length === 1
                                ? "subject"
                                : "subjects"}{" "}
                            found
                        </p>

                        <AnimatePresence>
                            {(selectedProgram ||
                                selectedSemester ||
                                searchTerm) && (
                                    <motion.button
                                        type="button"
                                        onClick={clearFilters}
                                        initial={{
                                            opacity: 0,
                                            x: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: 10,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        className={`text-left text-xs font-medium hover:underline sm:text-sm ${isDark
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Clear filters
                                    </motion.button>
                                )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* No subjects */}
                <AnimatePresence mode="wait">
                    {filteredSubjects.length === 0 ? (
                        <motion.div
                            key="empty"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className={`rounded-2xl border p-10 text-center sm:p-16 ${isDark
                                ? "border-gray-800 bg-gray-900"
                                : "border-gray-200 bg-white"
                                }`}
                        >
                            <BookOpen
                                size={42}
                                className="mx-auto mb-4 opacity-40"
                            />

                            <h2 className="text-lg font-semibold">
                                No subjects found
                            </h2>

                            <p
                                className={`mt-2 text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Try changing your filters or
                                search for another subject.
                            </p>

                            <motion.button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/admin/dashboard/subjects/add"
                                    )
                                }
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                <Plus size={17} />
                                Add Subject
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="subjects"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className={`overflow-hidden rounded-2xl border ${isDark
                                ? "border-gray-800 bg-gray-900"
                                : "border-gray-200 bg-white shadow-sm"
                                }`}
                        >
                            {/* Desktop / Tablet table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left">
                                    <thead
                                        className={
                                            isDark
                                                ? "bg-gray-800/50"
                                                : "bg-gray-50"
                                        }
                                    >
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                                                #
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                                                Subject
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                                                Program
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                                                Semester
                                            </th>

                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <motion.tbody
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`divide-y ${isDark
                                            ? "divide-gray-800"
                                            : "divide-gray-100"
                                            }`}
                                    >
                                        {filteredSubjects.map(
                                            (
                                                subject,
                                                index
                                            ) => {
                                                const semester =
                                                    getSemester(
                                                        subject.semesterId
                                                    );

                                                const subjectProgram =
                                                    getProgram(
                                                        subject.semesterId
                                                    );

                                                return (
                                                    <motion.tr
                                                        key={
                                                            subject.id
                                                        }
                                                        variants={
                                                            listItemVariants
                                                        }
                                                        layout
                                                        className={
                                                            isDark
                                                                ? "hover:bg-gray-800/40"
                                                                : "hover:bg-gray-50"
                                                        }
                                                    >
                                                        {/* Number */}
                                                        <td className="px-6 py-4 text-sm opacity-60">
                                                            {index +
                                                                1}
                                                        </td>

                                                        {/* Subject */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <motion.div
                                                                    whileHover={{
                                                                        scale: 1.04,
                                                                    }}
                                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isDark
                                                                        ? "bg-gray-800"
                                                                        : "bg-gray-100"
                                                                        }`}
                                                                >
                                                                    <BookOpen
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </motion.div>

                                                                <span className="font-semibold">
                                                                    {
                                                                        subject.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>

                                                        {/* Program */}
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-medium ${isDark
                                                                    ? "bg-gray-800 text-gray-300"
                                                                    : "bg-gray-100 text-gray-700"
                                                                    }`}
                                                            >
                                                                {subjectProgram?.name ||
                                                                    "—"}
                                                            </span>
                                                        </td>

                                                        {/* Semester */}
                                                        <td className="px-6 py-4 text-sm opacity-70">
                                                            {semester
                                                                ? `Semester ${semester.number}`
                                                                : "—"}
                                                        </td>

                                                        {/* Delete */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex justify-end">
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDeleteSubject(
                                                                            subject
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        deletingId ===
                                                                        subject.id
                                                                    }
                                                                    whileHover={{
                                                                        scale: 1.06,
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.92,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.15,
                                                                    }}
                                                                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    title="Delete subject"
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </motion.button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            }
                                        )}
                                    </motion.tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="divide-y md:hidden"
                            >
                                {filteredSubjects.map(
                                    (
                                        subject,
                                        index
                                    ) => {
                                        const semester =
                                            getSemester(
                                                subject.semesterId
                                            );

                                        const subjectProgram =
                                            getProgram(
                                                subject.semesterId
                                            );

                                        return (
                                            <motion.div
                                                key={
                                                    subject.id
                                                }
                                                variants={
                                                    listItemVariants
                                                }
                                                layout
                                                className={`p-4 ${isDark
                                                    ? "divide-gray-800"
                                                    : "divide-gray-100"
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    {/* Subject */}
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <motion.div
                                                            whileHover={{
                                                                scale: 1.04,
                                                            }}
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isDark
                                                                ? "bg-gray-800"
                                                                : "bg-gray-100"
                                                                }`}
                                                        >
                                                            <BookOpen
                                                                size={
                                                                    18
                                                                }
                                                            />
                                                        </motion.div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold">
                                                                {
                                                                    subject.name
                                                                }
                                                            </p>

                                                            <p
                                                                className={`mt-1 text-xs ${isDark
                                                                    ? "text-gray-500"
                                                                    : "text-gray-500"
                                                                    }`}
                                                            >
                                                                #
                                                                {index +
                                                                    1}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Delete */}
                                                    <motion.button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteSubject(
                                                                subject
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            subject.id
                                                        }
                                                        whileHover={{
                                                            scale: 1.06,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.92,
                                                        }}
                                                        transition={{
                                                            duration: 0.15,
                                                        }}
                                                        className="shrink-0 rounded-lg p-2 text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                                        title="Delete subject"
                                                    >
                                                        <Trash2
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </motion.button>
                                                </div>

                                                {/* Program / Semester */}
                                                <div className="mt-4 flex flex-wrap gap-2 pl-[52px]">
                                                    <span
                                                        className={`rounded-lg px-2.5 py-1 text-xs font-medium ${isDark
                                                            ? "bg-gray-800 text-gray-300"
                                                            : "bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        {
                                                            subjectProgram?.name ||
                                                            "No Program"
                                                        }
                                                    </span>

                                                    <span
                                                        className={`rounded-lg px-2.5 py-1 text-xs font-medium ${isDark
                                                            ? "bg-gray-800 text-gray-400"
                                                            : "bg-gray-100 text-gray-600"
                                                            }`}
                                                    >
                                                        {semester
                                                            ? `Semester ${semester.number}`
                                                            : "No Semester"}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    }
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}

export default AdminSubjects;