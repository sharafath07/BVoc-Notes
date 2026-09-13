import React from "react";
import {
    BookOpen,
    FileText,
    ClipboardList,
    Download,
    Eye,
    ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
    cardVariants,
    containerVariants,
} from "../../animations";

function ResourceCard({
    resources,
    type,
    subject,
    semester,
    isDark,
    onBack,
}) {
    const getDriveFileId = (url) => {
        const match = url?.match(/\/d\/([^/]+)/);
        return match ? match[1] : null;
    };

    const handleDownload = (url) => {
        const fileId = getDriveFileId(url);

        if (!fileId) {
            alert("Invalid Google Drive link");
            return;
        }

        const downloadUrl =
            `https://drive.google.com/uc?export=download&id=${fileId}`;

        window.open(downloadUrl, "_blank");
    };

    const getIcon = () => {
        if (type === "NOTES") {
            return <BookOpen size={21} />;
        }

        if (type === "SYLLABUS") {
            return <FileText size={21} />;
        }

        return <ClipboardList size={21} />;
    };

    const getTitle = () => {
        if (type === "NOTES") return "Notes";
        if (type === "SYLLABUS") return "Syllabus";
        if (type === "PYQ") return "Previous Year Questions";

        return type;
    };

    return (
        <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
        >
            {/* Back */}

            <motion.button
                type="button"
                onClick={onBack}
                variants={cardVariants}
                whileHover={{
                    x: -4,
                }}
                whileTap={{
                    scale: 0.97,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={`mb-5 flex items-center gap-2 text-sm transition hover:underline ${isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
            >
                <ArrowLeft size={16} />
                <span>Back to Resource Types</span>
            </motion.button>


            {/* Heading */}

            <motion.div
                className="mb-7"
                variants={cardVariants}
            >
                <p
                    className={`text-xs sm:text-sm ${isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                        }`}
                >
                    Semester {semester.number}
                    {" / "}
                    {subject.name}
                </p>

                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                    {getTitle()}
                </h2>
            </motion.div>


            {/* Resources */}

            <AnimatePresence mode="wait">
                {resources.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        className={`rounded-2xl border p-8 text-center sm:p-12 ${isDark
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-white shadow-md"
                            }`}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.3,
                                delay: 0.1,
                            }}
                        >
                            <FileText
                                size={40}
                                className="mx-auto mb-4 text-gray-400"
                            />
                        </motion.div>

                        <h3 className="text-lg font-semibold sm:text-xl">
                            No resources available
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            There are currently no resources for this subject.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="resources"
                        className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {resources.map((resource) => (
                            <motion.div
                                key={resource.id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`flex min-w-0 flex-col rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${isDark
                                    ? "border-gray-800 bg-gray-900 hover:border-gray-700 hover:shadow-xl"
                                    : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <motion.div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${isDark
                                            ? "bg-white text-black"
                                            : "bg-black text-white"
                                            }`}
                                        whileHover={{
                                            scale: 1.05,
                                            rotate: -3,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                    >
                                        {getIcon()}
                                    </motion.div>

                                    <span
                                        className={`max-w-[55%] truncate rounded-full px-3 py-1 text-[10px] sm:text-xs ${isDark
                                            ? "bg-gray-800 text-gray-400"
                                            : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {resource.type}
                                    </span>
                                </div>

                                <h3 className="mt-5 break-words text-base font-semibold sm:text-lg">
                                    {resource.title}
                                </h3>

                                <p
                                    className={`mt-2 line-clamp-3 text-sm leading-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {resource.description ||
                                        "No description available."}
                                </p>

                                <div className="mt-auto flex gap-2 pt-6 sm:gap-3">

                                    {/* Preview */}

                                    <motion.a
                                        href={resource.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                        className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-sm ${isDark
                                            ? "border-gray-700 text-white hover:bg-gray-800"
                                            : "border-gray-300 text-gray-900 hover:bg-gray-100"
                                            }`}
                                    >
                                        <Eye size={16} />
                                        <span>Preview</span>
                                    </motion.a>


                                    {/* Download */}

                                    <motion.button
                                        type="button"
                                        onClick={() =>
                                            handleDownload(
                                                resource.fileUrl
                                            )
                                        }
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                        }}
                                        className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-sm ${isDark
                                            ? "bg-white text-black hover:bg-gray-200"
                                            : "bg-black text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        <Download size={16} />
                                        <span>Download</span>
                                    </motion.button>

                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default ResourceCard;