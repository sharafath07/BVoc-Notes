import React from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import {
    cardVariants,
    containerVariants,
    buttonVariants,
} from "../../animations";

function ProgramBox({
    programs,
    isDark,
    onSelect,
}) {
    return (
        <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="mb-6 flex items-center gap-3"
                variants={cardVariants}
            >
                <GraduationCap size={22} />

                <h2 className="text-xl font-bold sm:text-2xl">
                    Select Program
                </h2>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-2 lg:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {programs.map((program) => (
                    <motion.button
                        type="button"
                        key={program.id}
                        onClick={() => onSelect(program)}
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
                        className={`group rounded-2xl border p-6 text-center transition-all duration-300 hover:border-gray-300 hover:shadow-xl sm:p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800"
                            : "border-gray-200 bg-white shadow-md"
                            }`}
                    >
                        <motion.div
                            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 sm:mb-5 sm:h-16 sm:w-16 ${isDark
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
                            <GraduationCap
                                size={28}
                                className="sm:h-8 sm:w-8"
                            />
                        </motion.div>

                        <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
                            {program.name}
                        </h3>

                        <p
                            className={`mt-2 text-xs sm:text-sm ${isDark
                                ? "text-gray-500"
                                : "text-gray-500"
                                }`}
                        >
                            View Semesters
                        </p>
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default ProgramBox;