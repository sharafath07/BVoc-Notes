import React, {
    useContext,
    useMemo,
    useState,
} from "react";

import {
    Edit,
    Trash2,
    Plus,
    ExternalLink,
    Search,
    X,
    ChevronDown,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "motion/react";

import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    pageVariants,
    containerVariants,
    cardVariants,
    buttonVariants,
    fadeVariants,
} from "../../animations";

function AdminResources() {
    const {
        isDark,
        backendUrl,
        program = [],
        resources,
        setResources,
        semesters = [],
        subjects = [],
        canManageResources,
    } = useContext(Context);

    const [deletingId, setDeletingId] =
        useState(null);

    const [search, setSearch] = useState("");

    const [selectedProgram, setSelectedProgram] =
        useState("");

    const [selectedSemester, setSelectedSemester] =
        useState("");

    const [selectedSubject, setSelectedSubject] =
        useState("");

    const [selectedType, setSelectedType] =
        useState("");

    const resourceTypes = [
        "NOTES",
        "SYLLABUS",
        "PYQ",
    ];

    /*
     * Semesters belonging to selected program
     */
    const filteredSemesters = useMemo(() => {
        if (!selectedProgram) {
            return [];
        }

        return semesters.filter(
            (semester) =>
                semester.programId === selectedProgram
        );
    }, [selectedProgram, semesters]);

    /*
     * Subjects belonging to selected semester
     */
    const filteredSubjects = useMemo(() => {
        if (!selectedSemester) {
            return [];
        }

        return (
            subjects?.filter(
                (subject) =>
                    subject.semesterId ===
                    selectedSemester ||
                    subject.semester?.id ===
                    selectedSemester
            ) || []
        );
    }, [subjects, selectedSemester]);

    /*
     * Filter resources
     */
    const filteredResources = useMemo(() => {
        return (
            resources?.filter((resource) => {
                const searchValue =
                    search.toLowerCase().trim();

                const resourceProgramId =
                    resource.subject?.semester
                        ?.programId ||
                    resource.subject?.semester
                        ?.program?.id ||
                    "";

                const resourceSemesterId =
                    resource.subject?.semester?.id ||
                    "";

                const resourceSubjectId =
                    resource.subjectId ||
                    resource.subject?.id ||
                    "";

                const matchesSearch =
                    resource.title
                        ?.toLowerCase()
                        .includes(searchValue);

                const matchesProgram =
                    !selectedProgram ||
                    resourceProgramId ===
                    selectedProgram;

                const matchesSemester =
                    !selectedSemester ||
                    resourceSemesterId ===
                    selectedSemester;

                const matchesSubject =
                    !selectedSubject ||
                    resourceSubjectId ===
                    selectedSubject;

                const matchesType =
                    !selectedType ||
                    resource.type === selectedType;

                return (
                    matchesSearch &&
                    matchesProgram &&
                    matchesSemester &&
                    matchesSubject &&
                    matchesType
                );
            }) || []
        );
    }, [
        resources,
        search,
        selectedProgram,
        selectedSemester,
        selectedSubject,
        selectedType,
    ]);

    /*
     * Program change
     */
    function handleProgramChange(e) {
        setSelectedProgram(e.target.value);
        setSelectedSemester("");
        setSelectedSubject("");
    }

    /*
     * Semester change
     */
    function handleSemesterChange(e) {
        setSelectedSemester(e.target.value);
        setSelectedSubject("");
    }

    /*
     * Clear all filters
     */
    function clearFilters() {
        setSearch("");
        setSelectedProgram("");
        setSelectedSemester("");
        setSelectedSubject("");
        setSelectedType("");
    }

    const hasFilters =
        search ||
        selectedProgram ||
        selectedSemester ||
        selectedSubject ||
        selectedType;

    /*
     * Delete resource
     */
    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await api.delete(
                `${backendUrl}/api/resources/${id}`
            );

            setResources((prevResources) =>
                prevResources.filter(
                    (resource) =>
                        resource.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Delete resource:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete resource"
            );
        } finally {
            setDeletingId(null);
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
                    className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <motion.p
                            variants={cardVariants}
                            className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:text-sm sm:tracking-wider ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Administration
                        </motion.p>

                        <motion.h1
                            variants={cardVariants}
                            className="text-2xl font-bold sm:text-3xl md:text-4xl"
                        >
                            Resources
                        </motion.h1>

                        <motion.p
                            variants={cardVariants}
                            className={`mt-2 text-sm sm:text-base ${isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                                }`}
                        >
                            Manage all uploaded resources.
                        </motion.p>
                    </div>

                    {canManageResources && (
                        <motion.div
                            variants={cardVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                to="/admin/dashboard/resources/add"
                                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition sm:w-fit ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                <Plus size={18} />
                                Add Resource
                            </Link>
                        </motion.div>
                    )}
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
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                    y: 5,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="text-sm font-semibold sm:text-base"
                            >
                                Filter Resources
                            </motion.h2>

                            <p
                                className={`mt-1 text-xs leading-5 sm:text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Find resources by program,
                                semester, subject or type.
                            </p>
                        </div>

                        <AnimatePresence>
                            {hasFilters && (
                                <motion.button
                                    type="button"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    whileHover={{
                                        scale: 1.03,
                                    }}
                                    whileTap={{
                                        scale: 0.96,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    onClick={clearFilters}
                                    className={`flex shrink-0 items-center gap-1.5 text-xs font-medium hover:underline sm:text-sm ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                        }`}
                                >
                                    <X size={15} />
                                    Clear
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-5"
                    >

                        {/* Search */}
                        <motion.div
                            variants={cardVariants}
                            className="relative"
                        >
                            <Search
                                size={18}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />

                            <motion.input
                                type="text"
                                placeholder="Search resource..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                    }`}
                            />
                        </motion.div>

                        {/* Program */}
                        <div className="relative">
                            <motion.select
                                variants={cardVariants}
                                value={selectedProgram}
                                onChange={
                                    handleProgramChange
                                }
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full appearance-none rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                    }`}
                            >
                                <option value="">
                                    All Programs
                                </option>

                                {program.map(
                                    (item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    )
                                )}
                            </motion.select>

                            <ChevronDown
                                size={17}
                                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />
                        </div>

                        {/* Semester */}
                        <div className="relative">
                            <motion.select
                                variants={cardVariants}
                                value={selectedSemester}
                                onChange={
                                    handleSemesterChange
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
                                    duration: 0.2,
                                }}
                                className={`w-full appearance-none rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500 disabled:bg-gray-900 disabled:text-gray-600"
                                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                                    } disabled:cursor-not-allowed`}
                            >
                                <option value="">
                                    {selectedProgram
                                        ? "All Semesters"
                                        : "Select program first"}
                                </option>

                                {filteredSemesters.map(
                                    (semester) => (
                                        <option
                                            key={semester.id}
                                            value={semester.id}
                                        >
                                            Semester{" "}
                                            {semester.number}
                                        </option>
                                    )
                                )}
                            </motion.select>

                            <ChevronDown
                                size={17}
                                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />
                        </div>

                        {/* Subject */}
                        <div className="relative">
                            <motion.select
                                variants={cardVariants}
                                value={selectedSubject}
                                onChange={(e) =>
                                    setSelectedSubject(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    !selectedSemester
                                }
                                whileFocus={
                                    selectedSemester
                                        ? {
                                            scale: 1.005,
                                        }
                                        : undefined
                                }
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full appearance-none rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500 disabled:bg-gray-900 disabled:text-gray-600"
                                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                                    } disabled:cursor-not-allowed`}
                            >
                                <option value="">
                                    {selectedSemester
                                        ? "All Subjects"
                                        : "Select semester first"}
                                </option>

                                {filteredSubjects.map(
                                    (subject) => (
                                        <option
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </option>
                                    )
                                )}
                            </motion.select>

                            <ChevronDown
                                size={17}
                                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />
                        </div>

                        {/* Type */}
                        <div className="relative">
                            <motion.select
                                variants={cardVariants}
                                value={selectedType}
                                onChange={(e) =>
                                    setSelectedType(
                                        e.target.value
                                    )
                                }
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full appearance-none rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                    }`}
                            >
                                <option value="">
                                    All Types
                                </option>

                                {resourceTypes.map(
                                    (type) => (
                                        <option
                                            key={type}
                                            value={type}
                                        >
                                            {type.replaceAll(
                                                "_",
                                                " "
                                            )}
                                        </option>
                                    )
                                )}
                            </motion.select>

                            <ChevronDown
                                size={17}
                                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />
                        </div>
                    </motion.div>

                    {/* Result count */}
                    <motion.div
                        key={`${filteredResources.length}-${resources?.length || 0}`}
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
                        className={`mt-4 text-xs sm:text-sm ${isDark
                            ? "text-gray-500"
                            : "text-gray-500"
                            }`}
                    >
                        Showing{" "}
                        <span className="font-semibold">
                            {filteredResources.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold">
                            {resources?.length || 0}
                        </span>{" "}
                        resources
                    </motion.div>
                </motion.div>

                {/* Resource Table */}
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
                        <table className="w-full min-w-[950px] text-left">

                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Resource
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Subject
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Semester
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Added By
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        File
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {filteredResources.length === 0 ? (
                                        <motion.tr
                                            key="empty"
                                            variants={fadeVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <td
                                                colSpan="6"
                                                className={`px-4 py-10 text-center text-sm sm:px-6 sm:py-12 ${isDark
                                                    ? "text-gray-500"
                                                    : "text-gray-400"
                                                    }`}
                                            >
                                                No resources found.
                                            </td>
                                        </motion.tr>
                                    ) : (
                                        filteredResources.map(
                                            (resource) => {
                                                const isDeleting =
                                                    deletingId ===
                                                    resource.id;

                                                return (
                                                    <motion.tr
                                                        key={
                                                            resource.id
                                                        }
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
                                                        className={`border-t transition-colors ${isDark
                                                            ? "border-gray-800 hover:bg-gray-800"
                                                            : "border-gray-200 hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        {/* Resource */}
                                                        <td className="max-w-[240px] px-4 py-4 sm:px-6">
                                                            <div className="truncate text-sm font-medium">
                                                                {
                                                                    resource.title
                                                                }
                                                            </div>

                                                            <div
                                                                className={`mt-1 text-xs ${isDark
                                                                    ? "text-gray-500"
                                                                    : "text-gray-400"
                                                                    }`}
                                                            >
                                                                {
                                                                    resource.type
                                                                }
                                                            </div>
                                                        </td>

                                                        {/* Subject */}
                                                        <td
                                                            className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                                ? "text-gray-300"
                                                                : "text-gray-700"
                                                                }`}
                                                        >
                                                            {resource
                                                                .subject
                                                                ?.name ||
                                                                "N/A"}
                                                        </td>

                                                        {/* Semester */}
                                                        <td
                                                            className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                                ? "text-gray-300"
                                                                : "text-gray-700"
                                                                }`}
                                                        >
                                                            {resource
                                                                .subject
                                                                ?.semester
                                                                ?.number
                                                                ? `Semester ${resource.subject.semester.number}`
                                                                : "N/A"}
                                                        </td>

                                                        {/* Added By */}
                                                        <td
                                                            className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                                ? "text-gray-300"
                                                                : "text-gray-700"
                                                                }`}
                                                        >
                                                            {resource
                                                                .uploadedBy
                                                                ?.name ||
                                                                "N/A"}
                                                        </td>

                                                        {/* File */}
                                                        <td className="px-4 py-4 sm:px-6">
                                                            {resource.fileUrl ? (
                                                                <motion.a
                                                                    href={
                                                                        resource.fileUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    whileHover={{
                                                                        x: 3,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.2,
                                                                    }}
                                                                    className={`inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium hover:underline ${isDark
                                                                        ? "text-gray-300"
                                                                        : "text-gray-700"
                                                                        }`}
                                                                >
                                                                    <ExternalLink
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                    Open File
                                                                </motion.a>
                                                            ) : (
                                                                <span
                                                                    className={`text-sm ${isDark
                                                                        ? "text-gray-600"
                                                                        : "text-gray-400"
                                                                        }`}
                                                                >
                                                                    No file
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-4 py-4 sm:px-6">
                                                            <div className="flex items-center gap-1.5 sm:gap-2">

                                                                {/* Edit */}
                                                                {canManageResources && (
                                                                    <motion.div
                                                                        whileHover={{
                                                                            scale: isDeleting
                                                                                ? 1
                                                                                : 1.05,
                                                                        }}
                                                                        whileTap={{
                                                                            scale: isDeleting
                                                                                ? 1
                                                                                : 0.95,
                                                                        }}
                                                                        transition={{
                                                                            duration: 0.15,
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            to={`/admin/dashboard/resources/edit/${resource.id}`}
                                                                            className={`block rounded-lg p-2 transition ${isDark
                                                                                ? "text-gray-300 hover:bg-gray-700"
                                                                                : "text-gray-600 hover:bg-gray-100"
                                                                                } ${isDeleting
                                                                                    ? "pointer-events-none opacity-40"
                                                                                    : ""
                                                                                }`}
                                                                            title="Edit"
                                                                            aria-label={`Edit ${resource.title}`}
                                                                        >
                                                                            <Edit
                                                                                size={
                                                                                    17
                                                                                }
                                                                            />
                                                                        </Link>
                                                                    </motion.div>
                                                                )}

                                                                {/* Delete */}
                                                                {canManageResources && (
                                                                    <motion.button
                                                                        type="button"
                                                                        disabled={
                                                                            deletingId !==
                                                                            null
                                                                        }
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                resource.id
                                                                            )
                                                                        }
                                                                        whileHover={
                                                                            deletingId !==
                                                                                null
                                                                                ? undefined
                                                                                : {
                                                                                    scale: 1.05,
                                                                                }
                                                                        }
                                                                        whileTap={
                                                                            deletingId !==
                                                                                null
                                                                                ? undefined
                                                                                : {
                                                                                    scale: 0.95,
                                                                                }
                                                                        }
                                                                        transition={{
                                                                            duration: 0.15,
                                                                        }}
                                                                        className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${isDark
                                                                            ? "text-gray-400 hover:bg-gray-700"
                                                                            : "text-gray-600 hover:bg-gray-100"
                                                                            }`}
                                                                        title="Delete"
                                                                        aria-label={`Delete ${resource.title}`}
                                                                    >
                                                                        {isDeleting ? (
                                                                            <span className="block h-[17px] w-[17px] animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                                        ) : (
                                                                            <Trash2
                                                                                size={
                                                                                    17
                                                                                }
                                                                            />
                                                                        )}
                                                                    </motion.button>
                                                                )}

                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            }
                                        )
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Mobile hint */}
                <AnimatePresence>
                    {filteredResources.length > 0 && (
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

export default AdminResources;