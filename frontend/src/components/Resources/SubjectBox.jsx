import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
    cardVariants,
    containerVariants,
} from "../../animations";

function SubjectBox({
    subjects,
    semester,
    isDark,
    onSelect,
    onBack,
}) {
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
                <span>Back to Semesters</span>
            </motion.button>


            {/* Semester Heading */}

            <motion.h2
                className="mb-7 text-2xl font-bold sm:mb-8 sm:text-3xl"
                variants={cardVariants}
            >
                Semester {semester.number}
            </motion.h2>


            {/* Subjects */}

            <AnimatePresence mode="wait">
                {subjects.length === 0 ? (
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
                            ? "border-gray-800 bg-gray-900 text-gray-300"
                            : "border-gray-200 bg-white text-gray-600 shadow-md"
                            }`}
                    >
                        No subjects found for this semester.
                    </motion.div>
                ) : (
                    <motion.div
                        key="subjects"
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {subjects.map((subject) => (
                            <motion.button
                                type="button"
                                key={subject.id}
                                onClick={() => onSelect(subject)}
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
                                className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${isDark
                                    ? "border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800 hover:shadow-xl"
                                    : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                    }`}
                            >
                                <motion.div
                                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                        }`}
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >
                                    <BookOpen size={21} />
                                </motion.div>

                                <h3 className="break-words text-base font-semibold sm:text-lg">
                                    {subject.name}
                                </h3>

                                <p
                                    className={`mt-2 text-sm ${isDark
                                        ? "text-gray-500"
                                        : "text-gray-500"
                                        }`}
                                >
                                    View Resources
                                </p>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default SubjectBox;