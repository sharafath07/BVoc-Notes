// SemesterBox.jsx

import React from "react";
import { GraduationCap } from "lucide-react";

function SemesterBox({
    semesters,
    isDark,
    onSelect,
}) {
    return (
        <div className="w-full">
            <div className="mb-6 flex items-center gap-3">
                <GraduationCap size={22} />

                <h2 className="text-xl font-bold sm:text-2xl">
                    Select Semester
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
                {semesters.map((semester) => (
                    <button
                        type="button"
                        key={semester.id}
                        onClick={() => onSelect(semester)}
                        className={`group rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1 sm:p-8 ${isDark
                            ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                            : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                            }`}
                    >
                        <div
                            className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl sm:mb-5 sm:h-14 sm:w-14 ${isDark
                                ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                }`}
                        >
                            <GraduationCap size={25} />
                        </div>

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
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SemesterBox;