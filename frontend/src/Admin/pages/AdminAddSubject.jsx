import React, {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown } from "lucide-react";

import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    cardVariants,
    containerVariants,
    buttonVariants,
} from "../../animations";

function AdminAddSubject() {
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
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(false);

    /*
     * Get semesters for selected program
     */
    const filteredSemesters = useMemo(() => {
        if (!selectedProgram) return [];

        return semesters.filter(
            (semester) =>
                semester.programId === selectedProgram
        );
    }, [selectedProgram, semesters]);

    /*
     * Reset semester when program changes
     */
    useEffect(() => {
        setSelectedSemester("");
    }, [selectedProgram]);

    /*
     * Submit
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = subjectName.trim();

        if (!selectedProgram) {
            alert("Please select a program.");
            return;
        }

        if (!selectedSemester) {
            alert("Please select a semester.");
            return;
        }

        if (!name) {
            alert("Please enter a subject name.");
            return;
        }

        /*
         * Prevent duplicate subject in the same semester
         */
        const alreadyExists = subjects.some(
            (subject) =>
                subject.semesterId === selectedSemester &&
                subject.name.trim().toLowerCase() ===
                name.toLowerCase()
        );

        if (alreadyExists) {
            alert(
                "This subject already exists in the selected semester."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                `${backendUrl}/api/subjects`,
                {
                    name,
                    semesterId: selectedSemester,
                }
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Failed to add subject"
                );
            }

            /*
             * Add newly created subject to Context
             */
            setSubjects((currentSubjects) => [
                ...currentSubjects,
                response.data.subject,
            ]);

            alert("Subject added successfully.");

            navigate("/admin/dashboard/subjects");
        } catch (error) {
            console.error("Add subject error:", error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to add subject"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-3xl">

                {/* Back */}
                <motion.button
                    type="button"
                    onClick={() =>
                        navigate("/admin/dashboard/subjects")
                    }
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.35,
                        ease: "easeOut",
                    }}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`mb-6 flex items-center gap-2 text-sm transition ${isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                >
                    <ArrowLeft size={17} />
                    Back to Subjects
                </motion.button>


                {/* Header */}
                <motion.div
                    className="mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.06,
                            rotate: 2,
                        }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                    >
                        <BookOpen size={24} />
                    </motion.div>

                    <motion.p
                        variants={cardVariants}
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Administration
                    </motion.p>

                    <motion.h1
                        variants={cardVariants}
                        className="text-3xl font-bold sm:text-4xl"
                    >
                        Add Subject
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mt-3 text-sm leading-6 sm:text-base ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Add a new subject to a program and
                        semester.
                    </motion.p>
                </motion.div>


                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                    className={`rounded-2xl border p-5 sm:p-7 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-sm"
                        }`}
                >
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        {/* Program */}
                        <motion.div variants={cardVariants}>
                            <label
                                htmlFor="program"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Program
                            </label>

                            <div className="relative">
                                <motion.select
                                    id="program"
                                    value={selectedProgram}
                                    onChange={(event) =>
                                        setSelectedProgram(
                                            event.target.value
                                        )
                                    }
                                    whileFocus={{ scale: 1.005 }}
                                    transition={{
                                        duration: 0.15,
                                    }}
                                    className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white focus:border-gray-500"
                                        : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                        }`}
                                >
                                    <option value="">
                                        Select Program
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
                        </motion.div>


                        {/* Semester */}
                        <motion.div variants={cardVariants}>
                            <label
                                htmlFor="semester"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Semester
                            </label>

                            <div className="relative">
                                <motion.select
                                    id="semester"
                                    value={selectedSemester}
                                    onChange={(event) =>
                                        setSelectedSemester(
                                            event.target.value
                                        )
                                    }
                                    disabled={!selectedProgram}
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
                                            ? "Select Semester"
                                            : "Select Program First"}
                                    </option>

                                    {filteredSemesters.map(
                                        (semester) => (
                                            <option
                                                key={semester.id}
                                                value={semester.id}
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
                        </motion.div>


                        {/* Subject name */}
                        <motion.div variants={cardVariants}>
                            <label
                                htmlFor="subjectName"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Subject Name
                            </label>

                            <motion.input
                                id="subjectName"
                                type="text"
                                value={subjectName}
                                onChange={(event) =>
                                    setSubjectName(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter subject name"
                                maxLength={150}
                                whileFocus={{ scale: 1.005 }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                    }`}
                            />

                            <motion.p
                                key={subjectName.length}
                                initial={{
                                    opacity: 0,
                                    y: -2,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className={`mt-2 text-xs ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            >
                                {subjectName.length}/150
                            </motion.p>
                        </motion.div>

                    </motion.div>


                    {/* Actions */}
                    <motion.div
                        className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.35,
                            delay: 0.4,
                        }}
                    >
                        <motion.button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/dashboard/subjects"
                                )
                            }
                            disabled={loading}
                            whileHover={{
                                scale: 1.01,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:opacity-50 ${isDark
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${isDark
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-black text-white hover:bg-gray-800"
                                }`}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Subject"}
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>
        </motion.section>
    );
}

export default AdminAddSubject;