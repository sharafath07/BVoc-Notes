// SubjectBox.jsx

import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";

function SubjectBox({
    subjects,
    semester,
    isDark,
    onSelect,
    onBack,
}) {
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={onBack}
                className={`mb-5 flex items-center gap-2 text-sm transition hover:underline ${isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
            >
                <ArrowLeft size={16} />
                <span>Back to Semesters</span>
            </button>

            <h2 className="mb-7 text-2xl font-bold sm:mb-8 sm:text-3xl">
                Semester {semester.number}
            </h2>

            {subjects.length === 0 ? (
                <div
                    className={`rounded-2xl border p-8 text-center sm:p-12 ${isDark
                        ? "border-gray-800 bg-gray-900 text-gray-300"
                        : "border-gray-200 bg-white text-gray-600 shadow-md"
                        }`}
                >
                    No subjects found for this semester.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    {subjects.map((subject) => (
                        <button
                            type="button"
                            key={subject.id}
                            onClick={() => onSelect(subject)}
                            className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 sm:p-6 ${isDark
                                ? "border-gray-800 bg-gray-900 hover:bg-gray-800 hover:shadow-xl"
                                : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                }`}
                        >
                            <div
                                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-100"
                                    }`}
                            >
                                <BookOpen size={21} />
                            </div>

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
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SubjectBox;