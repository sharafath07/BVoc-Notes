import React, {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Link as LinkIcon,
    Save,
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { motion } from "motion/react";

import { Context } from "../../Context/Context";
import api from "../../api/axios";

import {
    pageVariants,
    containerVariants,
    cardVariants,
    buttonVariants,
} from "../../animations";

function AdminEditResource() {
    const {
        backendUrl,
        semesters,
        subjects,
        resources,
        setResources,
        isDark,
    } = useContext(Context);

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [semester, setSemester] = useState("");
    const [subject, setSubject] = useState("");
    const [type, setType] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /*
     * Find resource from Context
     */
    const resource = useMemo(() => {
        return resources?.find(
            (resource) => resource.id === id
        );
    }, [resources, id]);

    /*
     * Load resource into form
     */
    useEffect(() => {
        if (!id || !resources) return;

        if (!resource) {
            setLoading(false);
            return;
        }

        setTitle(resource.title || "");
        setDescription(resource.description || "");

        setSemester(
            resource.subject?.semester?.id || ""
        );

        setSubject(
            resource.subjectId ||
            resource.subject?.id ||
            ""
        );

        setType(resource.type || "");
        setFileUrl(resource.fileUrl || "");

        setLoading(false);
    }, [id, resources, resource]);

    /*
     * Subjects belonging to selected semester
     */
    const subjectList = useMemo(() => {
        if (!semester) {
            return [];
        }

        return (
            subjects?.filter(
                (subject) =>
                    subject.semesterId === semester
            ) || []
        );
    }, [subjects, semester]);

    /*
     * When semester changes,
     * make sure selected subject belongs to it.
     */
    useEffect(() => {
        if (!semester || !subject) return;

        const subjectExists = subjectList.some(
            (item) => item.id === subject
        );

        if (!subjectExists) {
            setSubject("");
        }
    }, [semester, subjectList, subject]);

    function handleSemesterChange(e) {
        setSemester(e.target.value);
        setSubject("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!id) {
            alert("Resource ID is missing");
            return;
        }

        const resourceData = {
            title: title.trim(),
            description: description.trim(),
            subjectId: subject,
            type,
            fileName: title.trim(),
            fileUrl: fileUrl.trim(),
        };

        try {
            setSaving(true);

            const response = await api.put(
                `${backendUrl}/api/resources/${id}`,
                resourceData
            );

            if (response.data.success) {
                const updatedResource =
                    response.data.resource;

                setResources((prevResources) =>
                    prevResources.map((resource) =>
                        resource.id === id
                            ? updatedResource
                            : resource
                    )
                );

                navigate(
                    "/admin/dashboard/resources"
                );
            }
        } catch (error) {
            console.error(
                "Updation of Resource failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Updation of Resource Failed"
            );
        } finally {
            setSaving(false);
        }
    }

    /*
     * Loading state
     */
    if (loading) {
        return (
            <motion.section
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.4,
                    ease: "easeOut",
                }}
                className={`min-h-screen w-full px-4 py-20 font-roboto sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                    ? "bg-gray-950 text-white"
                    : "bg-gray-50 text-gray-900"
                    }`}
            >
                <div className="mx-auto w-full max-w-4xl">
                    <motion.p
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
                        }}
                        className={`text-sm sm:text-base ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        Loading resource...
                    </motion.p>
                </div>
            </motion.section>
        );
    }

    /*
     * Resource not found
     */
    if (!resource) {
        return (
            <motion.section
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.4,
                    ease: "easeOut",
                }}
                className={`min-h-screen w-full px-4 py-20 font-roboto sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                    ? "bg-gray-950 text-white"
                    : "bg-gray-50 text-gray-900"
                    }`}
            >
                <div className="mx-auto w-full max-w-4xl">
                    <motion.h1
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-2xl font-bold sm:text-3xl"
                    >
                        Resource not found
                    </motion.h1>

                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="mt-4 inline-block"
                    >
                        <Link
                            to="/admin/dashboard/resources"
                            className={`text-sm underline sm:text-base ${isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            Back to Resources
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        );
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
            <div className="mx-auto w-full max-w-4xl">

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-7 sm:mb-8"
                >
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
                        Edit Resource
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mt-2 text-sm leading-6 sm:text-base sm:leading-7 ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        Update the resource details.
                    </motion.p>
                </motion.div>

                {/* Form */}
                <motion.form
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        delay: 0.12,
                        duration: 0.4,
                        ease: "easeOut",
                    }}
                    onSubmit={handleSubmit}
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
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full rounded-lg border px-3 py-3 text-sm outline-none transition sm:px-4 sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-600 focus:border-gray-500"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    }`}
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
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full resize-none rounded-lg border px-3 py-3 text-sm leading-6 outline-none transition sm:px-4 sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-600 focus:border-gray-500"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    }`}
                            />
                        </motion.div>

                        {/* Semester + Subject */}
                        <motion.div
                            variants={cardVariants}
                            className="mb-5 grid grid-cols-1 gap-5 sm:mb-6 md:grid-cols-2"
                        >

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

                                <motion.select
                                    id="resource-semester"
                                    value={semester}
                                    onChange={
                                        handleSemesterChange
                                    }
                                    required
                                    whileFocus={{
                                        scale: 1.005,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className={`w-full rounded-lg border px-3 py-3 text-sm outline-none sm:px-4 sm:text-base ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                        : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                        }`}
                                >
                                    <option value="">
                                        Select semester
                                    </option>

                                    {semesters?.map(
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
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="resource-subject"
                                    className={`mb-2 block text-sm font-medium ${isDark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    Subject
                                </label>

                                <motion.select
                                    id="resource-subject"
                                    value={subject}
                                    onChange={(e) =>
                                        setSubject(
                                            e.target.value
                                        )
                                    }
                                    required
                                    disabled={!semester}
                                    whileFocus={
                                        semester
                                            ? {
                                                scale: 1.005,
                                            }
                                            : undefined
                                    }
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className={`w-full rounded-lg border px-3 py-3 text-sm outline-none sm:px-4 sm:text-base ${isDark
                                        ? "border-gray-700 bg-gray-800 text-white disabled:text-gray-600"
                                        : "border-gray-300 bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
                                        }`}
                                >
                                    <option value="">
                                        {semester
                                            ? "Select subject"
                                            : "Select semester first"}
                                    </option>

                                    {subjectList.map(
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
                            </div>
                        </motion.div>

                        {/* Type */}
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
                                value={type}
                                onChange={(e) =>
                                    setType(e.target.value)
                                }
                                required
                                whileFocus={{
                                    scale: 1.005,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`w-full rounded-lg border px-3 py-3 text-sm outline-none sm:px-4 sm:text-base ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                    : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                    }`}
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
                                    size={18}
                                    className={`mx-3 shrink-0 ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                        }`}
                                />

                                <input
                                    id="resource-url"
                                    type="url"
                                    value={fileUrl}
                                    onChange={(e) =>
                                        setFileUrl(
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://drive.google.com/..."
                                    required
                                    className={`min-w-0 w-full bg-transparent px-2 py-3 text-sm outline-none sm:text-base ${isDark
                                        ? "text-white placeholder:text-gray-600"
                                        : "text-gray-900 placeholder:text-gray-400"
                                        }`}
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
                                    x: -2,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                            >
                                <Link
                                    to="/admin/dashboard/resources"
                                    className={`flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition sm:w-auto sm:text-base ${isDark
                                        ? "border-gray-700 hover:bg-gray-800"
                                        : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    Cancel
                                </Link>
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={saving}
                                variants={buttonVariants}
                                whileHover={
                                    saving
                                        ? undefined
                                        : "hover"
                                }
                                whileTap={
                                    saving
                                        ? undefined
                                        : "tap"
                                }
                                className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition sm:w-auto sm:text-base ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                <Save size={18} />

                                {saving
                                    ? "Saving..."
                                    : "Save Resource"}
                            </motion.button>
                        </motion.div>

                    </motion.div>
                </motion.form>
            </div>
        </motion.section>
    );
}

export default AdminEditResource;