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
        <div>
            <button
                onClick={onBack}
                className={`mb-6 flex items-center gap-2 text-sm transition hover:underline ${isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
            >
                <ArrowLeft size={16} />
                Back to Semesters
            </button>

            <h2 className="mb-8 text-3xl font-bold">
                Semester {semester.number}
            </h2>

            {subjects.length === 0 ? (
                <div className="rounded-2xl border p-12 text-center">
                    No subjects found for this semester.
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject) => (
                        <button
                            key={subject.id}
                            onClick={() => onSelect(subject)}
                            className={`rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 ${isDark
                                ? "border-gray-800 bg-gray-900 hover:bg-gray-800 hover:shadow-xl"
                                : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                }`}
                        >
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                    ? "bg-gray-800"
                                    : "bg-gray-100"
                                    }`}
                            >
                                <BookOpen size={23} />
                            </div>

                            <h3 className="text-lg font-semibold">
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