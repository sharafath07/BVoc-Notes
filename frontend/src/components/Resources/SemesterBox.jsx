import React from "react";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import {
    cardVariants,
    containerVariants,
} from "../../animations";

function SemesterBox({
    semesters,
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
                <span>Back to Programs</span>
            </motion.button>


            {/* Heading */}

            <motion.div
                className="mb-6 flex items-center gap-3"
                variants={cardVariants}
            >
                <GraduationCap size={22} />

                <h2 className="text-xl font-bold sm:text-2xl">
                    Select Semester
                </h2>
            </motion.div>


            {/* Semester Cards */}

            <motion.div
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {semesters.map((semester) => (
                    <motion.button
                        type="button"
                        key={semester.id}
                        onClick={() => onSelect(semester)}
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            scale: 1.01,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className={`group rounded-2xl border p-5 text-center transition-all duration-300 sm:p-8 ${isDark
                            ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                            : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                            }`}
                    >
                        <motion.div
                            className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl sm:mb-5 sm:h-14 sm:w-14 ${isDark
                                ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                }`}
                            whileHover={{
                                scale: 1.05,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            <GraduationCap size={25} />
                        </motion.div>

                        <h3 className="text-sm font-semibold sm:text-lg">
                            Semester {semester.number}
                        </h3>

                        <p
                            className={`mt-1.5 text-xs sm:mt-2 sm:text-sm ${isDark
                                ? "text-gray-500"
                                : "text-gray-500"
                                }`}
                        >
                            View Subjects
                        </p>
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default SemesterBox;