// ResourceTypeBox.jsx

import React from "react";
import {
    BookOpen,
    FileText,
    ClipboardList,
    ArrowLeft,
} from "lucide-react";

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
                <span>Back to Subjects</span>
            </button>

            <div className="mb-7 sm:mb-8">
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
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
                {resourceTypes.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            type="button"
                            key={item.type}
                            onClick={() => onSelect(item.type)}
                            className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 sm:p-7 ${isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                }`}
                        >
                            <div
                                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 ${isDark
                                    ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                    : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                    }`}
                            >
                                <Icon size={23} />
                            </div>

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
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ResourceTypeBox;