import React, {
    useContext,
    useMemo,
    useState,
} from "react";

import {
    Search,
    Pencil,
    Trash2,
    Users,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { Context } from "../../Context/Context";

import {
    pageVariants,
    containerVariants,
    cardVariants,
    buttonVariants,
    fadeVariants,
} from "../../animations";

function AdminFaculties() {
    const {
        isDark,
        faculty = [],
    } = useContext(Context);

    const [search, setSearch] = useState("");

    const filteredFaculty = useMemo(() => {
        return faculty.filter((member) =>
            member.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [faculty, search]);

    const handleEdit = (member) => {
        console.log("Edit faculty:", member);
    };

    const handleDelete = (member) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${member.name}?`
        );

        if (!confirmed) return;

        console.log("Delete faculty:", member);
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
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-6xl">

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
                                className="text-2xl font-bold sm:text-3xl"
                            >
                                Faculty
                            </motion.h1>

                            <motion.p
                                variants={cardVariants}
                                className={`mt-1 text-xs sm:text-sm ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                Manage faculty members
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                {/* Search */}
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
                    <div className="relative w-full max-w-md">

                        <motion.div
                            animate={{
                                scale: search ? 1.04 : 1,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            <Search
                                size={19}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />
                        </motion.div>

                        <motion.input
                            type="text"
                            placeholder="Search faculty by name..."
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
                    </div>
                </motion.div>

                {/* Count */}
                <motion.div
                    key={filteredFaculty.length}
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
                        {filteredFaculty.length}
                    </span>{" "}
                    faculty members
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
                        <table className="w-full min-w-[600px] text-left">

                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody
                                className={`divide-y ${isDark
                                    ? "divide-gray-800"
                                    : "divide-gray-200"
                                    }`}
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredFaculty.length === 0 ? (
                                        <motion.tr
                                            key="empty"
                                            variants={fadeVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <td
                                                colSpan="3"
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
                                                        No faculty members found
                                                    </p>

                                                    <p className="mt-1 text-xs sm:text-sm">
                                                        Try changing your search.
                                                    </p>
                                                </motion.div>
                                            </td>
                                        </motion.tr>
                                    ) : (
                                        filteredFaculty.map(
                                            (member) => (
                                                <motion.tr
                                                    key={member.id}
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
                                                    {/* Name */}
                                                    <td
                                                        className={`px-4 py-4 text-sm font-medium sm:px-6 ${isDark
                                                            ? "text-white"
                                                            : "text-gray-900"
                                                            }`}
                                                    >
                                                        <span className="block max-w-[180px] truncate sm:max-w-none">
                                                            {member.name}
                                                        </span>
                                                    </td>

                                                    {/* Email */}
                                                    <td
                                                        className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                            ? "text-gray-400"
                                                            : "text-gray-600"
                                                            }`}
                                                    >
                                                        <span className="block max-w-[220px] truncate sm:max-w-none">
                                                            {member.email}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <div className="flex justify-center gap-2">

                                                            {/* Edit */}
                                                            <motion.button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        member
                                                                    )
                                                                }
                                                                title="Edit faculty"
                                                                aria-label={`Edit ${member.name}`}
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                                transition={{
                                                                    duration: 0.15,
                                                                }}
                                                                className={`rounded-lg border p-2 ${isDark
                                                                    ? "border-gray-700 text-gray-300 hover:bg-white hover:text-black"
                                                                    : "border-gray-300 text-gray-600 hover:bg-black hover:text-white"
                                                                    }`}
                                                            >
                                                                <Pencil
                                                                    size={16}
                                                                />
                                                            </motion.button>

                                                            {/* Delete */}
                                                            <motion.button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        member
                                                                    )
                                                                }
                                                                title="Delete faculty"
                                                                aria-label={`Delete ${member.name}`}
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
                                                                    size={16}
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

                {/* Mobile table hint */}
                <AnimatePresence>
                    {filteredFaculty.length > 0 && (
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

export default AdminFaculties;