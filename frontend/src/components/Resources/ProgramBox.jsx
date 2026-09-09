// ProgramBox.jsx

import React from "react";
import { GraduationCap } from "lucide-react";

function ProgramBox({
    programs,
    isDark,
    onSelect,
}) {
    return (
        <div className="w-full">
            <div className="mb-6 flex items-center gap-3">
                <GraduationCap size={22} />

                <h2 className="text-xl font-bold sm:text-2xl">
                    Select Program
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-2 lg:gap-6">
                {programs.map((program) => (
                    <button
                        type="button"
                        key={program.id}
                        onClick={() => onSelect(program)}
                        className={`group rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:p-8 md:p-10 ${isDark
                            ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                            : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                            }`}
                    >
                        <div
                            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 sm:mb-5 sm:h-16 sm:w-16 ${isDark
                                ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                }`}
                        >
                            <GraduationCap
                                size={28}
                                className="sm:h-8 sm:w-8"
                            />
                        </div>

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
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProgramBox;