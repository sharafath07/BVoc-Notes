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
        <div>
            <button
                onClick={onBack}
                className={`mb-6 flex items-center gap-2 text-sm transition hover:underline ${isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}
            >
                <ArrowLeft size={16} />
                Back to Subjects
            </button>

            <div className="mb-8">
                <p
                    className={
                        isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                    }
                >
                    Semester {semester.number}
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                    {subject.name}
                </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {resourceTypes.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.type}
                            onClick={() => onSelect(item.type)}
                            className={`group rounded-2xl border p-7 text-left transition-all duration-300 hover:-translate-y-1 ${isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 hover:shadow-xl"
                                : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                }`}
                        >
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                    ? "bg-gray-800 group-hover:bg-white group-hover:text-black"
                                    : "bg-gray-100 group-hover:bg-black group-hover:text-white"
                                    }`}
                            >
                                <Icon size={24} />
                            </div>

                            <h3 className="text-xl font-semibold">
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