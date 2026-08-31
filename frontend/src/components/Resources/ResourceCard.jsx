import React from "react";
import {
    BookOpen,
    FileText,
    ClipboardList,
    Download,
    Eye,
    ArrowLeft,
} from "lucide-react";

function ResourceCard({
    resources,
    type,
    subject,
    semester,
    isDark,
    onBack,
}) {
    const getDriveFileId = (url) => {
        const match = url?.match(/\/d\/([^/]+)/);

        return match ? match[1] : null;
    };

    const handleDownload = (url) => {
        const fileId = getDriveFileId(url);

        if (!fileId) {
            alert("Invalid Google Drive link");
            return;
        }

        const downloadUrl =
            `https://drive.google.com/uc?export=download&id=${fileId}`;

        window.open(downloadUrl, "_blank");
    };

    const getIcon = () => {
        if (type === "NOTES") {
            return <BookOpen size={23} />;
        }

        if (type === "SYLLABUS") {
            return <FileText size={23} />;
        }

        return <ClipboardList size={23} />;
    };

    const getTitle = () => {
        if (type === "NOTES") return "Notes";
        if (type === "SYLLABUS") return "Syllabus";
        if (type === "PYQ") return "Previous Year Questions";

        return type;
    };

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
                Back to Resource Types
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
                    {" / "}
                    {subject.name}
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                    {getTitle()}
                </h2>
            </div>

            {resources.length === 0 ? (
                <div
                    className={`rounded-2xl border p-12 text-center ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <FileText
                        size={42}
                        className="mx-auto mb-4 text-gray-400"
                    />

                    <h3 className="text-xl font-semibold">
                        No resources available
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        There are currently no resources for this subject.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map((resource) => (
                        <div
                            key={resource.id}
                            className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-700 hover:shadow-xl"
                                : "border-gray-200 bg-white shadow-md hover:shadow-xl"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    {getIcon()}
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs ${isDark
                                        ? "bg-gray-800 text-gray-400"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {resource.type}
                                </span>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold">
                                {resource.title}
                            </h3>

                            <p
                                className={`mt-2 line-clamp-3 text-sm leading-6 ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                {resource.description ||
                                    "No description available."}
                            </p>

                            <div className="mt-6 flex gap-3">

                                <a
                                    href={resource.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${isDark
                                        ? "border-gray-700 text-white hover:bg-gray-800"
                                        : "border-gray-300 text-gray-900 hover:bg-gray-100"
                                        }`}
                                >
                                    <Eye size={17} />
                                    Preview
                                </a>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDownload(resource.fileUrl)
                                    }
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${isDark
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-black text-white hover:bg-gray-800"
                                        }`}
                                >
                                    <Download size={17} />
                                    Download
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ResourceCard;