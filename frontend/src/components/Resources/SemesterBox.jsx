import React from "react";
import { GraduationCap } from "lucide-react";

function SemesterBox({
    semesters,
    isDark,
    onSelect,
}) {
    return (
        <div>
            <div className="mb-6 flex items-center gap-3">
                <GraduationCap size={24} />

                <h2 className="text-2xl font-bold">
                    Select Semester
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                {semesters.map((semester) => (
                    <button
                        key={semester.id}
                        onClick={() => onSelect(semester)}
                        className={`group rounded-2xl border p-8 text-center transition-all duration-300 hover:-translate-y-1 ${isDark
                            ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                            : "border-gray-200 bg-white shadow-md hover:border-gray-300 hover:shadow-xl"
                            }`}
                    >
                        <div
                            className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${isDark
                                ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                }`}
                        >
                            <GraduationCap size={28} />
                        </div>

                        <h3 className="text-lg font-semibold">
                            Semester {semester.number}
                        </h3>

                        <p
                            className={`mt-2 text-sm ${isDark
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