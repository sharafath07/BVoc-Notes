import React from "react";
import {
    BookOpen,
    FileText,
    ClipboardList,
    ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import {
    cardVariants,
    containerVariants,
} from "../../animations";

function ResourceTypeBox({
    isDark,
    subject,
    semester,
    onSelect,
    onBack,
}) {
    const resourceTypes = [
        {
            type: "NOTES",
            title: "Notes",
            description: "Study notes and learning materials",
            icon: BookOpen,
        },
        {
            type: "SYLLABUS",
            title: "Syllabus",
            description: "Subject syllabus and curriculum",
            icon: FileText,
        },
        {
            type: "PYQ",
            title: "Previous Year Questions",
            description: "Previous year question papers",
            icon: ClipboardList,
        },
    ];

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
                <span>Back to Subjects</span>
            </motion.button>


            {/* Subject Heading */}

            <motion.div
                className="mb-7 sm:mb-8"
                variants={cardVariants}
            >
                <p
                    className={`text-xs sm:text-sm ${isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                        }`}
                >
                    Semester {semester.number}
                </p>

                <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                    {subject.name}
                </h2>
            </motion.div>


            {/* Resource Types */}

            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {resourceTypes.map((item) => {
                    const Icon = item.icon;

                    return (
                        <motion.button
                            type="button"
                            key={item.type}
                            onClick={() => onSelect(item.type)}
                            variants={cardVariants}
                            whileHover={{
                                y: -5,
                                scale: 1.01,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 sm:p-7 ${isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                }`}
                        >
                            <motion.div
                                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                    ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                    : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                    }`}
                                whileHover={{
                                    rotate: -4,
                                    scale: 1.05,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                <Icon size={23} />
                            </motion.div>

                            <h3 className="text-lg font-semibold sm:text-xl">
                                {item.title}
                            </h3>

                            <p
                                className={`mt-2 text-sm leading-6 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                {item.description}
                            </p>
                        </motion.button>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}

export default ResourceTypeBox;