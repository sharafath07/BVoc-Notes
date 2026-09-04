import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Edit,
    Trash2,
    Plus,
    ExternalLink,
    Search,
    X,
} from "lucide-react";
import { Context } from "../../Context/Context";
import api from "../../api/axios";

function AdminResources() {
    const {
        isDark,
        backendUrl,
        resources,
        setResources,
        semesters,
        subjects,
    } = useContext(Context);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const resourceTypes = [
        "NOTES",
        "SYLLABUS",
        "PYQ"
    ];

    /*
     * Subjects belonging to selected semester
     */
    const filteredSubjects = useMemo(() => {
        if (!selectedSemester) {
            return [];
        }

        return (
            subjects?.filter(
                (subject) =>
                    subject.semesterId === selectedSemester ||
                    subject.semester?.id === selectedSemester
            ) || []
        );
    }, [subjects, selectedSemester]);

    /*
     * Filter resources
     */
    const filteredResources = useMemo(() => {
        return (
            resources?.filter((resource) => {
                const matchesSearch =
                    resource.title
                        ?.toLowerCase()
                        .includes(search.toLowerCase());

                const matchesSemester =
                    !selectedSemester ||
                    resource.subject?.semester?.id === selectedSemester;

                const matchesSubject =
                    !selectedSubject ||
                    resource.subjectId === selectedSubject;

                const matchesType =
                    !selectedType ||
                    resource.type === selectedType;

                return (
                    matchesSearch &&
                    matchesSemester &&
                    matchesSubject &&
                    matchesType
                );
            }) || []
        );
    }, [
        resources,
        search,
        selectedSemester,
        selectedSubject,
        selectedType,
    ]);

    /*
     * When semester changes,
     * reset selected subject.
     */
    function handleSemesterChange(e) {
        setSelectedSemester(e.target.value);
        setSelectedSubject("");
    }

    /*
     * Clear all filters
     */
    function clearFilters() {
        setSearch("");
        setSelectedSemester("");
        setSelectedSubject("");
        setSelectedType("");
    }

    const hasFilters =
        search ||
        selectedSemester ||
        selectedSubject ||
        selectedType;

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            await api.delete(
                `${backendUrl}/api/resources/${id}`
            );

            setResources(
                resources.filter(
                    (resource) => resource.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Delete resource:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete resource"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section
            className={`min-h-screen px-6 py-24 transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p
                            className={`mb-2 text-sm font-semibold uppercase tracking-wider ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        >
                            Administration
                        </p>

                        <h1 className="text-3xl font-bold">
                            Resources
                        </h1>

                        <p
                            className={`mt-2 ${isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                                }`}
                        >
                            Manage all uploaded resources.
                        </p>
                    </div>

                    <Link
                        to="/admin/dashboard/resources/add"
                        className={`flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${isDark
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-black text-white hover:bg-gray-800"
                            }`}
                    >
                        <Plus size={18} />
                        Add Resource
                    </Link>
                </div>

                {/* Filters */}
                <div
                    className={`mb-6 rounded-2xl border p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold">
                                Filter Resources
                            </h2>

                            <p
                                className={`mt-1 text-sm ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                    }`}
                            >
                                Find resources by name,
                                semester, subject or type.
                            </p>
                        </div>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className={`flex items-center gap-1.5 text-sm font-medium hover:underline ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                    }`}
                            >
                                <X size={16} />
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                        {/* Search */}
                        <div className="relative">
                            <Search
                                size={18}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />

                            <input
                                type="text"
                                placeholder="Search resource..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                    }`}
                            />
                        </div>

                        {/* Semester */}
                        <select
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            className={`rounded-lg border px-3 py-2.5 text-sm outline-none transition ${isDark
                                ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                }`}
                        >
                            <option value="">
                                All Semesters
                            </option>

                            {semesters?.map((semester) => (
                                <option
                                    key={semester.id}
                                    value={semester.id}
                                >
                                    Semester {semester.number}
                                </option>
                            ))}
                        </select>

                        {/* Subject */}
                        {selectedSemester ? (
                            <select
                                value={selectedSubject}
                                onChange={(e) =>
                                    setSelectedSubject(
                                        e.target.value
                                    )
                                }
                                className={`rounded-lg border px-3 py-2.5 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                    }`}
                            >
                                <option value="">
                                    All Subjects
                                </option>

                                {filteredSubjects.map(
                                    (subject) => (
                                        <option
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </option>
                                    )
                                )}
                            </select>
                        ) : (
                            <div
                                className={`flex items-center rounded-lg border px-3 py-2.5 text-sm ${isDark
                                    ? "border-gray-800 bg-gray-800 text-gray-600"
                                    : "border-gray-200 bg-gray-100 text-gray-400"
                                    }`}
                            >
                                Select semester first
                            </div>
                        )}

                        {/* Type */}
                        <select
                            value={selectedType}
                            onChange={(e) =>
                                setSelectedType(e.target.value)
                            }
                            className={`rounded-lg border px-3 py-2.5 text-sm outline-none transition ${isDark
                                ? "border-gray-700 bg-gray-800 text-white focus:border-gray-500"
                                : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                }`}
                        >
                            <option value="">
                                All Types
                            </option>

                            {resourceTypes.map((type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type.replaceAll(
                                        "_",
                                        " "
                                    )}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Result count */}
                    <div
                        className={`mt-4 text-sm ${isDark
                            ? "text-gray-500"
                            : "text-gray-500"
                            }`}
                    >
                        Showing{" "}
                        <span className="font-semibold">
                            {filteredResources.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold">
                            {resources?.length || 0}
                        </span>{" "}
                        resources
                    </div>
                </div>

                {/* Resource Table */}
                <div
                    className={`overflow-hidden rounded-2xl border ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left">

                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Resource
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Subject
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Semester
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Added By
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        File
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredResources.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className={`px-6 py-12 text-center ${isDark
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                                }`}
                                        >
                                            No resources found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredResources.map(
                                        (resource) => (
                                            <tr
                                                key={
                                                    resource.id
                                                }
                                                className={`border-t transition ${isDark
                                                    ? "border-gray-800 hover:bg-gray-800"
                                                    : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {/* Resource */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">
                                                        {
                                                            resource.title
                                                        }
                                                    </div>

                                                    <div
                                                        className={`mt-1 text-xs ${isDark
                                                            ? "text-gray-500"
                                                            : "text-gray-400"
                                                            }`}
                                                    >
                                                        {
                                                            resource.type
                                                        }
                                                    </div>
                                                </td>

                                                {/* Subject */}
                                                <td className="px-6 py-4">
                                                    {resource
                                                        .subject
                                                        ?.name ||
                                                        "N/A"}
                                                </td>

                                                {/* Semester */}
                                                <td className="px-6 py-4">
                                                    {resource
                                                        .subject
                                                        ?.semester
                                                        ?.number
                                                        ? `Semester ${resource.subject.semester.number}`
                                                        : "N/A"}
                                                </td>

                                                {/* Added By */}
                                                <td className="px-6 py-4">
                                                    {resource
                                                        .uploadedBy
                                                        ?.name ||
                                                        "N/A"}
                                                </td>

                                                {/* File */}
                                                <td className="px-6 py-4">
                                                    {resource.fileUrl ? (
                                                        <a
                                                            href={
                                                                resource.fileUrl
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className={`inline-flex items-center gap-2 text-sm font-medium hover:underline ${isDark
                                                                ? "text-gray-300"
                                                                : "text-gray-700"
                                                                }`}
                                                        >
                                                            <ExternalLink
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                            Open File
                                                        </a>
                                                    ) : (
                                                        <span
                                                            className={
                                                                isDark
                                                                    ? "text-gray-600"
                                                                    : "text-gray-400"
                                                            }
                                                        >
                                                            No file
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            to={`/admin/dashboard/resources/edit/${resource.id}`}
                                                            className={`rounded-lg p-2 transition ${isDark
                                                                ? "text-gray-300 hover:bg-gray-700"
                                                                : "text-gray-600 hover:bg-gray-100"
                                                                }`}
                                                            title="Edit"
                                                        >
                                                            <Edit
                                                                size={
                                                                    18
                                                                }
                                                            />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                loading
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    resource.id
                                                                )
                                                            }
                                                            className={`rounded-lg p-2 transition ${isDark
                                                                ? "text-gray-400 hover:bg-gray-700"
                                                                : "text-gray-600 hover:bg-gray-100"
                                                                }`}
                                                            title="Delete"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    18
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminResources;