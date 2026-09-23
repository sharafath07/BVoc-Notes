import React, {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Link as LinkIcon,
    Plus,
    ChevronDown,
} from "lucide-react";

import { motion } from "motion/react";

import { Context } from "../../Context/Context";
import api from "../../api/axios";
import { Link as LinkTo } from "react-router-dom";

import {
    cardVariants,
    containerVariants,
    buttonVariants,
} from "../../animations";

function AdminAddResource() {
    const {
        backendUrl,
        program = [],
        semesters = [],
        subjects = [],
        setResources,
        isDark,
    } = useContext(Context);

    const [selectedProgram, setSelectedProgram] =
        useState("");

    const [selectedSemester, setSelectedSemester] =
        useState("");

    const [subject, setSubject] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const [isSubmitting, setIsSubmitting] =
        useState(false);

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
                (item) =>
                    item.semesterId === selectedSemester
            ) || []
        );
    }, [selectedSemester, subjects]);

    /*
     * Reset semester and subject when
     * program changes
     */
    useEffect(() => {
        setSelectedSemester("");
        setSubject("");
    }, [selectedProgram]);

    /*
     * Reset subject when semester changes
     */
    useEffect(() => {
        setSubject("");
    }, [selectedSemester]);

    /*
     * Clear form
     */
    function clearForm() {
        setTitle("");
        setDescription("");
        setFileUrl("");
        setSelectedProgram("");
        setSelectedSemester("");
        setSubject("");
        setType("");
    }

    /*
     * Submit
     */
    async function handleSubmit(e) {
        e.preventDefault();

        const resourceData = {
            title: title.trim(),
            description: description.trim(),
            subjectId: subject,
            type,
            fileName: title.trim(),
            fileUrl: fileUrl.trim(),
        };

        if (!selectedProgram) {
            alert("Please select a program.");
            return;
        }

        if (!selectedSemester) {
            alert("Please select a semester.");
            return;
        }

        if (!subject) {
            alert("Please select a subject.");
            return;
        }

        if (!type) {
            alert("Please select a resource type.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await api.post(
                `${backendUrl}/api/resources/`,
                resourceData
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Failed to create resource"
                );
            }

            setResources((prevResources) => [
                ...prevResources,
                response.data.resource || resourceData,
            ]);

            clearForm();

            alert("Resource added successfully.");
        } catch (error) {
            console.error(
                "Creation of Resource failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Creation of Resource Failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className={`min-h-screen w-full px-4 py-20 font-roboto sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-4xl">

                {/* Header */}
                <motion.div
                    className="mb-7 sm:mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        variants={cardVariants}
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:text-sm ${isDark
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
                        Add Resource
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mt-2 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7 ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        Add study materials and useful
                        resources for students.
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
                    className={`rounded-2xl border p-4 shadow-md sm:rounded-3xl sm:p-6 md:p-8 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                        }`}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        {/* Title */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-5 sm:mb-6"
                        >
                            <label
                                htmlFor="resource-title"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Resource Title
                            </label>

                            <motion.input
                                id="resource-title"
                                type="text"
                                name="title"
                                placeholder="e.g. Data Structures Notes"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                                disabled={isSubmitting}
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className={`w-full rounded-lg border px-3 py-3 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-600 focus:border-gray-500"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    } disabled:cursor-not-allowed disabled:opacity-60`}
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-5 sm:mb-6"
                        >
                            <label
                                htmlFor="resource-description"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Description
                            </label>

                            <motion.textarea
                                id="resource-description"
                                name="description"
                                rows="4"
                                placeholder="Describe this resource..."
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                disabled={isSubmitting}
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className={`w-full resize-none rounded-lg border px-3 py-3 text-sm leading-6 outline-none transition sm:px-4 sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-600 focus:border-gray-500"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    } disabled:cursor-not-allowed disabled:opacity-60`}
                            />
                        </motion.div>

                        {/* Program + Semester */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-5 grid grid-cols-1 gap-5 sm:mb-6 md:grid-cols-2"
                        >

                            {/* Program */}
                            <div>
                                <label
                                    htmlFor="resource-program"
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Program
                                </label>

                                <div className="relative">
                                    <motion.select
                                        id="resource-program"
                                        value={selectedProgram}
                                        onChange={(e) =>
                                            setSelectedProgram(
                                                e.target.value
                                            )
                                        }
                                        required
                                        disabled={isSubmitting}
                                        whileFocus={{
                                            scale: 1.005,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                        className={`w-full appearance-none rounded-lg border px-3 py-3 pr-10 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                            ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                            : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                            } disabled:cursor-not-allowed disabled:opacity-60`}
                                    >
                                        <option value="">
                                            Select program
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
                                        size={18}
                                        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Semester */}
                            <div>
                                <label
                                    htmlFor="resource-semester"
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Semester
                                </label>

                                <div className="relative">
                                    <motion.select
                                        id="resource-semester"
                                        value={selectedSemester}
                                        onChange={(e) =>
                                            setSelectedSemester(
                                                e.target.value
                                            )
                                        }
                                        required
                                        disabled={
                                            !selectedProgram ||
                                            isSubmitting
                                        }
                                        whileFocus={
                                            selectedProgram &&
                                                !isSubmitting
                                                ? {
                                                    scale: 1.005,
                                                }
                                                : undefined
                                        }
                                        transition={{
                                            duration: 0.15,
                                        }}
                                        className={`w-full appearance-none rounded-lg border px-3 py-3 pr-10 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                            ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500 disabled:bg-gray-900 disabled:text-gray-600"
                                            : "border-gray-300 bg-white text-gray-900 focus:border-black disabled:bg-gray-100 disabled:text-gray-400"
                                            } disabled:cursor-not-allowed`}
                                    >
                                        <option value="">
                                            {selectedProgram
                                                ? "Select semester"
                                                : "Select program first"}
                                        </option>

                                        {filteredSemesters.map(
                                            (item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    Semester{" "}
                                                    {item.number}
                                                </option>
                                            )
                                        )}
                                    </motion.select>

                                    <ChevronDown
                                        size={18}
                                        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Subject */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-5 sm:mb-6"
                        >
                            <label
                                htmlFor="resource-subject"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Subject
                            </label>

                            <div className="relative">
                                <motion.select
                                    id="resource-subject"
                                    name="subject"
                                    required
                                    value={subject}
                                    onChange={(e) =>
                                        setSubject(
                                            e.target.value
                                        )
                                    }
                                    disabled={
                                        !selectedSemester ||
                                        isSubmitting
                                    }
                                    whileFocus={
                                        selectedSemester &&
                                            !isSubmitting
                                            ? {
                                                scale: 1.005,
                                            }
                                            : undefined
                                    }
                                    transition={{
                                        duration: 0.15,
                                    }}
                                    className={`w-full appearance-none rounded-lg border px-3 py-3 pr-10 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500 disabled:bg-gray-900 disabled:text-gray-600"
                                        : "border-gray-300 bg-white text-gray-900 focus:border-black disabled:bg-gray-100 disabled:text-gray-400"
                                        } disabled:cursor-not-allowed`}
                                >
                                    <option value="">
                                        {selectedSemester
                                            ? "Select subject"
                                            : "Select semester first"}
                                    </option>

                                    {filteredSubjects.map(
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
                                    size={18}
                                    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />
                            </div>
                        </motion.div>

                        {/* Resource Type */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-5 sm:mb-6"
                        >
                            <label
                                htmlFor="resource-type"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Resource Type
                            </label>

                            <motion.select
                                id="resource-type"
                                name="type"
                                required
                                value={type}
                                onChange={(e) =>
                                    setType(e.target.value)
                                }
                                disabled={isSubmitting}
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                className={`w-full rounded-lg border px-3 py-3 text-sm outline-none sm:px-4 sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                    : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                    } disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                                <option value="">
                                    Select type
                                </option>

                                <option value="SYLLABUS">
                                    Syllabus
                                </option>

                                <option value="PYQ">
                                    Previous Year Question
                                </option>

                                <option value="NOTES">
                                    Notes
                                </option>
                            </motion.select>
                        </motion.div>

                        {/* URL */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-6"
                        >
                            <label
                                htmlFor="resource-url"
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Resource URL
                            </label>

                            <motion.div
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`flex w-full items-center rounded-lg border ${isDark
                                    ? "border-gray-700 bg-gray-800"
                                    : "border-gray-300 bg-white"
                                    }`}
                            >
                                <LinkIcon
                                    size={19}
                                    className={`mx-3 shrink-0 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <input
                                    id="resource-url"
                                    type="url"
                                    name="url"
                                    value={fileUrl}
                                    onChange={(e) =>
                                        setFileUrl(
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://drive.google.com/..."
                                    required
                                    disabled={isSubmitting}
                                    className={`min-w-0 w-full rounded-r-lg bg-transparent px-2 py-3 text-sm outline-none sm:text-base ${isDark
                                        ? "text-white placeholder:text-gray-600"
                                        : "text-gray-900 placeholder:text-gray-400"
                                        } disabled:cursor-not-allowed disabled:opacity-60`}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            variants={cardVariants}
                            className={`flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end sm:pt-6 ${isDark
                                ? "border-gray-800"
                                : "border-gray-200"
                                }`}
                        >
                            <motion.div
                                whileHover={{
                                    scale: isSubmitting
                                        ? 1
                                        : 1.01,
                                }}
                                whileTap={{
                                    scale: isSubmitting
                                        ? 1
                                        : 0.98,
                                }}
                                className="w-full sm:w-auto"
                            >
                                <LinkTo
                                    to="/admin/dashboard/resources"
                                    className={`flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition sm:w-auto sm:text-base ${isDark
                                        ? "border-gray-700 hover:bg-gray-800"
                                        : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    Cancel
                                </LinkTo>
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                variants={buttonVariants}
                                whileHover={
                                    isSubmitting
                                        ? undefined
                                        : "hover"
                                }
                                whileTap={
                                    isSubmitting
                                        ? undefined
                                        : "tap"
                                }
                                className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition sm:w-auto sm:text-base ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                <motion.span
                                    whileHover={{
                                        rotate: isSubmitting
                                            ? 0
                                            : 3,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >
                                    <Plus size={18} />
                                </motion.span>

                                {isSubmitting
                                    ? "Adding..."
                                    : "Add Resource"}
                            </motion.button>
                        </motion.div>

                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    );
}

export default AdminAddResource;